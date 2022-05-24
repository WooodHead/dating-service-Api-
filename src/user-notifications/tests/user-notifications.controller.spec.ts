import { USER_NOTIFICATIONS_QUEUE_NAME } from './../user-notifications.constants';
import { BullModule } from '@nestjs/bull';
import { UserNotificationsProcessor } from './../user-notifications.processor';
import { PrismaService } from './../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserNotificationsController } from '../user-notifications.controller';
import { UserNotificationsService } from '../user-notifications.service';

describe('UserNotificationsController', () => {
  let controller: UserNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: USER_NOTIFICATIONS_QUEUE_NAME,
        }),
      ],
      controllers: [UserNotificationsController],
      providers: [
        UserNotificationsService,
        UserNotificationsProcessor,
        PrismaService,
      ],
    }).compile();

    controller = module.get<UserNotificationsController>(
      UserNotificationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
