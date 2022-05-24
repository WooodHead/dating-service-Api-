import { ApiResponseProperty } from '@nestjs/swagger';

import { UserSummaryEntity } from 'src/users/entities/user.entity';

export class ProfileViewEntity {
  @ApiResponseProperty({
    type: () => UserSummaryEntity,
  })
  user: UserSummaryEntity;
}
