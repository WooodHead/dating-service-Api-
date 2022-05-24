import { PrismaService } from './../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileLikesService } from '../user-profile-likes.service';
import { UserNotificationsModule } from '../../user-notifications/user-notifications.module';

describe('UserProfileLikesService', () => {
  let service: UserProfileLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserNotificationsModule],
      providers: [UserProfileLikesService, PrismaService],
    }).compile();

    service = module.get<UserProfileLikesService>(UserProfileLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
