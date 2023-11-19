import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm';

import { errorMessages, s3Folders } from 'src/constants';

import { GoogleAccountDto, UpdateGoogleAccountDto } from '../auth/dto';
import { UserRole, UserStatus } from '../auth/enums';
import { AwsService } from '../aws';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private awsService: AwsService,
  ) {}

  private hashPass = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt());

  async create({ password, role = UserRole.User, ...createUserDto }: CreateUserDto) {
    const userExists = await this.doesUserExist(createUserDto.email);

    if (userExists) {
      throw new BadRequestException(errorMessages.userAlreadyExists);
    }

    const hashedPass = password ? await this.hashPass(password) : undefined;
    const entity = this.usersRepository.create({ ...createUserDto, role, password: hashedPass });

    await this.usersRepository.save(entity);
    return entity;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string, options?: FindOneOptions<User>) {
    const entity = await this.usersRepository.findOne({
      ...options,
      where: { id, ...options?.where },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async findActiveByEmail(email: string) {
    const entity = await this.findByEmail(email);

    if (entity.status !== UserStatus.Active) {
      throw new NotFoundException();
    }

    return entity;
  }

  async findActiveByGoogleAccountId(googleAccountId: string) {
    const entity = await this.findByGoogleAccountId(googleAccountId);

    if (entity.status !== UserStatus.Active) {
      throw new NotFoundException();
    }

    return entity;
  }

  findUser(options: FindOneOptions<User>) {
    return this.usersRepository.findOne(options);
  }

  async findByEmail(email: string) {
    const entity = await this.usersRepository.findOne({ where: { email } });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async findByGoogleAccountId(googleAccountId: string) {
    const entity = await this.usersRepository.findOne({ where: { googleAccountId } });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  findUsersCount() {
    return this.usersRepository.count();
  }

  async doesUserExist(email: string) {
    const entity = await this.usersRepository.exist({ where: { email } });

    return entity;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.findOne(id);

    await this.usersRepository.update(entity.id, updateUserDto);

    return this.findOne(id);
  }

  async updateGoogleAccount(id: string, googleAccountDto: UpdateGoogleAccountDto) {
    const entity = await this.findOne(id);

    await this.usersRepository.update(entity.id, googleAccountDto);

    return this.findOne(id);
  }

  async createByGoogleAccount(googleAccountDto: GoogleAccountDto) {
    const userExists = await this.doesUserExist(googleAccountDto.email);

    if (userExists) {
      throw new BadRequestException(errorMessages.userAlreadyExists);
    }

    const entity = this.usersRepository.create({ ...googleAccountDto, isEmailVerified: true });

    await this.usersRepository.save(entity);
    return entity;
  }

  async updatePassword(id: string, password: string) {
    const entity = await this.findOne(id);

    const hashedPasswordUpdate = await this.hashPass(password);

    await this.usersRepository.update(entity.id, {
      password: hashedPasswordUpdate,
    });

    return this.findOne(id);
  }

  async uploadAvatar(id: string, image: Express.Multer.File) {
    const user = await this.findOne(id);

    if (user.imageUri) {
      void this.awsService.removeImage(user.imageUri);
    }

    const imageUri = await this.awsService.uploadImage(image, s3Folders.userAvatarFolder(id));

    user.imageUri = imageUri;
    await user.save();

    return imageUri;
  }
}
