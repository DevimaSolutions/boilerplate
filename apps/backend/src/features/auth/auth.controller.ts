import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../common/pipes';

import { Authorized } from './decorators';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto';
import { LocalAuthGuard } from './guards';
import { RequestWithUser } from './interfaces';
import { AuthService } from './services';
import { signUpSchema, forgotPasswordSchema, resetPasswordSchema } from './validations';

// Authorization is handled by NextAuth package in a frontend application
// This controller is used only as a proxy to access database securely
@ApiTags('Auth')
@Controller('authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  // _signInDto parameter is declared here to allow Swagger plugin
  // parse endpoint body signature
  signIn(@Req() req: RequestWithUser, @Body() _signInDto: SignInDto) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body(new ZodValidationPipe(signUpSchema)) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Authorized()
  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(
    @Body(new ZodValidationPipe(forgotPasswordSchema)) passwordForgotDto: ForgotPasswordDto,
  ) {
    return this.authService.sendForgotEmail(passwordForgotDto.email);
  }

  @Put('reset-password')
  async resetPassword(
    @Body(new ZodValidationPipe(resetPasswordSchema)) { token, password }: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, password);
  }
}
