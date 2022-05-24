import { Test, TestingModule } from '@nestjs/testing';
import { RefreshCountsController } from '../refresh-counts.controller';
import { RefreshCountsService } from '../refresh-counts.service';

describe('RefreshCountsController', () => {
  let controller: RefreshCountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshCountsController],
      providers: [RefreshCountsService],
    }).compile();

    controller = module.get<RefreshCountsController>(RefreshCountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
