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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// TODO: add ZodValidationPipe
// import { JoiValidationPipe } from 'src/pipes';

import { ZodValidationPipe } from '../common/pipes';

import { Authorized } from './decorators';
import { ForgotPasswordDto, RefreshTokenDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto';
import { LocalAuthGuard } from './guards';
import { RequestWithUser } from './interfaces';
import { AuthService } from './services';
import { signUpSchema } from './validations';
// import { forgotPasswordSchema, resetPasswordSchema, signUpSchema } from './validations';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  // _signInDto parameter is declared here to allow Swagger plugin
  // parse endpoint body signature
  async signIn(@Req() req: RequestWithUser, @Body() _signInDto: SignInDto) {
    return this.authService.signIn(req.user);
  }

  @ApiOperation({
    description: 'Generates new auth token pair using valid refresh token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
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
    // @Body(new JoiValidationPipe(forgotPasswordSchema)) passwordForgotDto: ForgotPasswordDto,
    @Body() passwordForgotDto: ForgotPasswordDto,
  ) {
    return this.authService.sendForgotEmail(passwordForgotDto.email);
  }

  @Put('reset-password')
  async resetPassword(
    // @Body(new JoiValidationPipe(resetPasswordSchema)) { token, password }: ResetPasswordDto,
    @Body() { token, password }: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, password);
  }
}
