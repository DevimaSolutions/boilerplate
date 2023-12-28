import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';

import { errorMessages } from 'src/constants';

import { GoogleAccountDto, UpdateGoogleAccountDto } from '../auth/dto';
import { AzureAdAccountDto } from '../auth/dto/azure-ad-account.dto';
import { UpdateAzureAdAccountDto } from '../auth/dto/update-azure-ad-account.dto';
import { UserRole, UserStatus } from '../auth/enums';
import { FileUploadService } from '../file-upload';
import fileFolders from '../file-upload/file-folders';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private fileUploadService: FileUploadService,
  ) {}

  private hashPass = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt());

  async create({ password, role = UserRole.User, ...createUserDto }: CreateUserDto) {
    const userExists = await this.doesUserExist(createUserDto.email);

    if (userExists) {
      throw new BadRequestException(errorMessages.userAlreadyExists);
    }

    const hashedPass = password ? await this.hashPass(password) : undefined;
    const entity = this.usersRepository.create({
      ...createUserDto,
      role,
      password: hashedPass,
    });

    await this.usersRepository.save(entity);
    return entity;
  }

  findBySessionId(sessionId: string) {
    const isUserId = uuidValidate(sessionId) && uuidVersion(sessionId) === 4;
    if (isUserId) {
      return this.findActive(sessionId);
    }

    const isGoogleAccountId = !isNaN(Number(sessionId));
    if (isGoogleAccountId) {
      return this.findActiveByGoogleAccountId(sessionId);
    }

    return this.findByAzureAdAccountId(sessionId);
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

  async findActive(userId: string) {
    return this.findOne(userId, {
      where: {
        status: UserStatus.Active,
        isEmailVerified: true,
      },
    });
  }

  async findActiveByEmail(email: string) {
    const entity = await this.findByEmail(email);

    if (entity.status !== UserStatus.Active || !entity.isEmailVerified) {
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

  async findByAzureAdAccountId(azureAdAccountId: string) {
    const entity = await this.usersRepository.findOne({ where: { azureAdAccountId } });
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

    if (updateUserDto.image) {
      const imageUri = await this.uploadAvatar(id, updateUserDto.image);
      await this.usersRepository.update(entity.id, { imageUri });
    }

    if (updateUserDto.email) {
      await this.usersRepository.update(entity.id, { email: updateUserDto.email });
    }

    return this.findOne(id);
  }

  async updateGoogleAccount(id: string, googleAccountDto: UpdateGoogleAccountDto) {
    const entity = await this.findOne(id);

    await this.usersRepository.update(entity.id, googleAccountDto);

    return this.findOne(id);
  }

  async updateByAzureAdAccount(id: string, azureAdAccountDto: UpdateAzureAdAccountDto) {
    const entity = await this.findOne(id);

    await this.usersRepository.update(entity.id, azureAdAccountDto);

    return this.findOne(id);
  }

  async createByGoogleAccount(googleAccountDto: GoogleAccountDto) {
    const userExists = await this.doesUserExist(googleAccountDto.email);

    if (userExists) {
      throw new BadRequestException(errorMessages.userAlreadyExists);
    }

    const entity = this.usersRepository.create({
      email: googleAccountDto.email,
      imageUri: googleAccountDto.imageUri,
      googleAccountId: googleAccountDto.accountId,
      isEmailVerified: true,
    });

    await this.usersRepository.save(entity);
    return entity;
  }

  async createByAzureAdAccount(azureAdAccountDto: AzureAdAccountDto) {
    const userExists = await this.doesUserExist(azureAdAccountDto.email);

    if (userExists) {
      throw new BadRequestException(errorMessages.userAlreadyExists);
    }

    const entity = this.usersRepository.create({
      email: azureAdAccountDto.email,
      azureAdAccountId: azureAdAccountDto.accountId,
      isEmailVerified: true,
    });

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
      const imageKey = this.fileUploadService.getFileKeyFromUri(user.imageUri);
      void this.fileUploadService.removeFile(imageKey);
    }

    const imageUri = await this.fileUploadService.uploadFile(
      image,
      fileFolders.userAvatarFolder(id),
    );

    user.imageUri = imageUri;
    await user.save();

    return imageUri;
  }
}
