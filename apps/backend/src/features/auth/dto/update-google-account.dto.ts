import { OmitType, PartialType } from '@nestjs/swagger';

import { GoogleAccountDto } from './google-account.dto';

export class UpdateGoogleAccountDto extends OmitType(PartialType(GoogleAccountDto), ['email']) {
  isEmailVerified: boolean;
}
