import { Test, TestingModule } from '@nestjs/testing';
import { RefreshCountsService } from '../refresh-counts.service';

describe('RefreshCountsService', () => {
  let service: RefreshCountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshCountsService],
    }).compile();

    service = module.get<RefreshCountsService>(RefreshCountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
