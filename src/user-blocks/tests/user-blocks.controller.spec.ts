import { Test, TestingModule } from '@nestjs/testing';
import { UserBlocksController } from '../user-blocks.controller';
import { UserBlocksService } from '../user-blocks.service';

describe('UserBlocksController', () => {
  let controller: UserBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBlocksController],
      providers: [UserBlocksService],
    }).compile();

    controller = module.get<UserBlocksController>(UserBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
