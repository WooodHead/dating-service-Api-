import { Test, TestingModule } from '@nestjs/testing';
import { UserBlocksService } from '../user-blocks.service';

describe('UserBlocksService', () => {
  let service: UserBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBlocksService],
    }).compile();

    service = module.get<UserBlocksService>(UserBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
