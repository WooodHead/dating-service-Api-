import { PrismaService } from './../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSessionsService } from './user-sessions.service';

describe('UserSessionsService', () => {
  let service: UserSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSessionsService, ConfigService, PrismaService],
    }).compile();

    service = module.get<UserSessionsService>(UserSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
