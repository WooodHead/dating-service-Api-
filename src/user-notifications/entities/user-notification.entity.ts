import { ApiResponseProperty } from '@nestjs/swagger';
import { Prisma, UserNotification, UserNotificationType } from '@prisma/client';

export class UserNotificationEntity implements UserNotification {
  id: string;

  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  type: UserNotificationType;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty({
    type: JSON,
  })
  meta: Prisma.JsonValue;

  @ApiResponseProperty()
  createdAt: Date;
  isRead: boolean;
  isActive: boolean;
}
