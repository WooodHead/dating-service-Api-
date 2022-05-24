/* eslint-disable prettier/prettier */
import { PrismaService } from '../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserQuotesController } from '../user-quotes.controller';
import { UserQuotesService } from '../user-quotes.service';

describe('UserQoutesController', () => {
  let controller: UserQuotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQuotesController],
      providers: [UserQuotesService, PrismaService],
    }).compile();

    controller = module.get<UserQuotesController>(UserQuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
