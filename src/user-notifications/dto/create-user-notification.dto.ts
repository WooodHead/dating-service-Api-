import { Prisma, UserNotification, UserNotificationType } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsJSON,
  IsString,
} from 'class-validator';

export class CreateUserNotificationDto implements Partial<UserNotification> {
  @IsString()
  userId: string;

  @IsEnum(UserNotificationType)
  type: UserNotificationType;

  @IsString()
  content: string;

  @IsJSON()
  meta: Prisma.JsonValue;

  @IsDateString()
  createdAt: Date;
}

export class CreateBulkUserNotificationDto {
  @IsArray()
  @ArrayMaxSize(200)
  @ArrayMinSize(1)
  userIds: string[];

  notification: Omit<CreateUserNotificationDto, 'userId'>;
}
