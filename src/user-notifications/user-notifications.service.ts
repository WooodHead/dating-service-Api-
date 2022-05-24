import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import {
  CreateUserNotificationDto,
  CreateBulkUserNotificationDto,
} from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';

import {
  USER_NOTIFICATIONS_QUEUE_EVENTS,
  USER_NOTIFICATIONS_QUEUE_NAME,
} from './user-notifications.constants';
import { ListUserNotificationDto } from './dto/list-user-notification.dto';

@Injectable()
export class UserNotificationsService {
  private readonly logger = new Logger(UserNotificationsService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue(USER_NOTIFICATIONS_QUEUE_NAME) private queue: Queue,
  ) {}

  create(data: CreateUserNotificationDto) {
    this.logger.log(`Creating user notification ${data.type}`);
    this.queue.add(
      USER_NOTIFICATIONS_QUEUE_EVENTS.CREATE_USER_NOTIFICATION,
      data,
    );
  }

  createBulk(data: CreateBulkUserNotificationDto) {
    this.logger.log(`Creating bulk user notification`);
    this.queue.add(
      USER_NOTIFICATIONS_QUEUE_EVENTS.CREATE_BULK_USER_NOTIFICATION,
      data,
    );
  }

  findAll(params: { userId: string; query: ListUserNotificationDto }) {
    return this.prisma.userNotification.findMany({
      where: {
        userId: params.userId,
      },
      skip: +params.query.offset,
      take: +params.query.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  update(params: {
    id: number;
    data: UpdateUserNotificationDto;
    userId: string;
  }) {
    this.queue.add(USER_NOTIFICATIONS_QUEUE_EVENTS.UPDATE_USER_NOTIFICATION, {
      id: params.id,
      userId: params.userId,
      ...params.data,
    });
  }

  remove(params: { id: number; userId: string }) {
    return this.queue.add(
      USER_NOTIFICATIONS_QUEUE_EVENTS.REMOVE_USER_NOTIFICATION,
      params,
    );
  }
}
