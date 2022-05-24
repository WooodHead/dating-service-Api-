import { PrismaService } from './../prisma/prisma.service';
import { OnQueueActive, OnQueueError, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import {
  CreateBulkUserNotificationDto,
  CreateUserNotificationDto,
} from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';
import { RemoveUserNotificationDto } from './dto/remove-user-notification.dto';

import {
  USER_NOTIFICATIONS_QUEUE_EVENTS,
  USER_NOTIFICATIONS_QUEUE_NAME,
} from './user-notifications.constants';

@Processor(USER_NOTIFICATIONS_QUEUE_NAME)
export class UserNotificationsProcessor {
  private readonly logger = new Logger(UserNotificationsProcessor.name);

  constructor(private prisma: PrismaService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.debug(`Error in job ${error.message}`);
  }

  @Process(USER_NOTIFICATIONS_QUEUE_EVENTS.CREATE_USER_NOTIFICATION)
  async create(job: Job) {
    this.logger.debug(USER_NOTIFICATIONS_QUEUE_EVENTS.CREATE_USER_NOTIFICATION);
    const data: CreateUserNotificationDto = job.data;
    const resp = await this.prisma.userNotification.create({
      data,
    });
    this.logger.debug(job.data.type, resp);
  }

  @Process(USER_NOTIFICATIONS_QUEUE_EVENTS.CREATE_BULK_USER_NOTIFICATION)
  async createBulk(job: Job) {
    this.logger.debug(
      USER_NOTIFICATIONS_QUEUE_EVENTS.CREATE_BULK_USER_NOTIFICATION,
    );
    const data: CreateBulkUserNotificationDto = job.data;
    const resp = await this.prisma.userNotification.createMany({
      data: data.userIds.map((userId) => ({
        userId,
        ...data.notification,
      })),
    });
    this.logger.debug(job.data.type, resp);
  }

  @Process(USER_NOTIFICATIONS_QUEUE_EVENTS.UPDATE_USER_NOTIFICATION)
  async update(job: Job) {
    this.logger.debug(USER_NOTIFICATIONS_QUEUE_EVENTS.UPDATE_USER_NOTIFICATION);
    const data: UpdateUserNotificationDto = job.data;
    this.prisma.userNotification.updateMany({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data: {
        isRead: data.isRead,
      },
    });
  }

  @Process(USER_NOTIFICATIONS_QUEUE_EVENTS.REMOVE_USER_NOTIFICATION)
  async remove(job: Job) {
    this.logger.debug(USER_NOTIFICATIONS_QUEUE_EVENTS.REMOVE_USER_NOTIFICATION);
    const data: RemoveUserNotificationDto = job.data;
    this.prisma.userNotification.updateMany({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data: {
        isActive: false,
      },
    });
  }
}
