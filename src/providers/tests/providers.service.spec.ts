import { PrismaService } from './../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersService } from '../providers.service';

describe('ProvidersService', () => {
  let service: ProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvidersService, PrismaService],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
