import { UserNotificationsModule } from './../../user-notifications/user-notifications.module';

import { PrismaService } from './../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileLikesController } from '../user-profile-likes.controller';
import { UserProfileLikesService } from '../user-profile-likes.service';

describe('UserProfileLikesController', () => {
  let controller: UserProfileLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserNotificationsModule],
      controllers: [UserProfileLikesController],
      providers: [UserProfileLikesService, PrismaService],
    }).compile();

    controller = module.get<UserProfileLikesController>(
      UserProfileLikesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
