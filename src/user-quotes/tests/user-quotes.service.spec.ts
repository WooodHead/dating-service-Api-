/* eslint-disable prettier/prettier */
import { PrismaService } from '../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserQuotesService } from '../user-quotes.service';

describe('UserQoutesService', () => {
  let service: UserQuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuotesService, PrismaService],
    }).compile();

    service = module.get<UserQuotesService>(UserQuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
