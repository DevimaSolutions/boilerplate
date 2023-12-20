import { PartialType, PickType } from '@nestjs/swagger';

import { User } from 'src/features/users/entities/user.entity';

export class UpdateAzureAdAccountDto extends PartialType(
  PickType(User, ['azureAdAccountId', 'isEmailVerified']),
) {}
