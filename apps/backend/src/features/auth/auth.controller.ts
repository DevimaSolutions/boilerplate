import { Controller, Post, UseGuards, Req, Body, Get, Put, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ZodValidationPipe } from 'src/features/common/pipes';

import { SuccessDto } from '../common/dto';
import { ErrorDto } from '../common/dto/error.dto';
import { ValidationErrorDto } from '../common/dto/validation-error.dto';
import { UsersService } from '../users';

import { Authorized } from './decorators';
import { RequireApiKey } from './decorators/require-api-key.decorator';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  GoogleAccountDto,
  AzureAdAccountDto,
  ConfirmEmailDto,
} from './dto';
import { LocalAuthGuard } from './guards';
import { RequestWithUser } from './interfaces';
import { AuthService } from './services';
import {
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googleAccountSchema,
  azureAdAccountSchema,
  confirmEmailSchema,
} from './validations';

// Authorization is handled by NextAuth package in a frontend application
// This controller is used only as a proxy to access database securely
@ApiTags('Auth')
@Controller('authorization')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @RequireApiKey()
  @Post('sign-in')
  // _signInDto parameter is declared here to allow Swagger plugin
  // parse endpoint body signature
  signIn(@Req() req: RequestWithUser, @Body() _signInDto: SignInDto) {
    return req.user;
  }

  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @UseGuards(ThrottlerGuard)
  @Post('sign-up')
  async signUp(@Body(new ZodValidationPipe(signUpSchema)) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Authorized()
  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @RequireApiKey()
  @ApiNotFoundResponse({ type: () => ErrorDto })
  @Get('session/:id')
  getSessionByUserId(@Param('id') id: string) {
    return this.userService.findBySessionId(id);
  }

  @RequireApiKey()
  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @Post('google')
  getProfileByGoogleAccount(
    @Body(new ZodValidationPipe(googleAccountSchema)) googleAccountDto: GoogleAccountDto,
  ) {
    return this.authService.validateGoogleAccount(googleAccountDto);
  }

  @RequireApiKey()
  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @Post('azure-ad')
  getProfileByAzureAdAccount(
    @Body(new ZodValidationPipe(azureAdAccountSchema)) azureAdAccountDto: AzureAdAccountDto,
  ) {
    return this.authService.validateAzureAdAccount(azureAdAccountDto);
  }

  @RequireApiKey()
  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @Post('confirm-email')
  async confirmEmail(
    @Body(new ZodValidationPipe(confirmEmailSchema)) confirmEmailDto: ConfirmEmailDto,
  ) {
    return this.authService.confirmEmail(confirmEmailDto.token);
  }

  @ApiOkResponse({ type: () => SuccessDto })
  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @Post('forgot-password')
  async forgotPassword(
    @Body(new ZodValidationPipe(forgotPasswordSchema)) passwordForgotDto: ForgotPasswordDto,
  ) {
    await this.authService.sendForgotEmail(passwordForgotDto.email);
    return new SuccessDto();
  }

  @ApiOkResponse({ type: () => SuccessDto })
  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @Put('reset-password')
  async resetPassword(
    @Body(new ZodValidationPipe(resetPasswordSchema)) { token, password }: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(token, password);
    return new SuccessDto();
  }
}
