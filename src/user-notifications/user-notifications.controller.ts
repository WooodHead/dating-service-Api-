import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt.guard';
import { UserNotificationEntity } from './entities/user-notification.entity';
import { ListUserNotificationDto } from './dto/list-user-notification.dto';

@ApiTags('Notifications')
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class UserNotificationsController {
  constructor(
    private readonly userNotificationsService: UserNotificationsService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all notifications of authenticated user',
    type: [UserNotificationEntity],
  })
  findAll(@Req() req, @Query() query: ListUserNotificationDto) {
    return this.userNotificationsService.findAll({
      userId: req.user.id,
      query,
    });
  }

  @Patch(':id')
  @ApiResponse({
    status: 204,
    description: 'Mark notification as read',
    type: [UserNotificationEntity],
  })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() data: UpdateUserNotificationDto,
  ) {
    return this.userNotificationsService.update({
      id: +id,
      userId: req.user.id,
      data,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Remove notification from history',
    type: [UserNotificationEntity],
  })
  remove(@Req() req, @Param('id') id: string) {
    return this.userNotificationsService.remove({
      id: +id,
      userId: req.user.id,
    });
  }
}
