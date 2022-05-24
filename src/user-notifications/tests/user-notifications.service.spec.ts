import { USER_NOTIFICATIONS_QUEUE_NAME } from './../user-notifications.constants';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from './../../prisma/prisma.service';
import { UserNotificationsProcessor } from './../user-notifications.processor';
import { Test, TestingModule } from '@nestjs/testing';
import { UserNotificationsService } from '../user-notifications.service';

describe('UserNotificationsService', () => {
  let service: UserNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: USER_NOTIFICATIONS_QUEUE_NAME,
        }),
      ],
      providers: [
        UserNotificationsService,
        UserNotificationsProcessor,
        PrismaService,
      ],
    }).compile();

    service = module.get<UserNotificationsService>(UserNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
