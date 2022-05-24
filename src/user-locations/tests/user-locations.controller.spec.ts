import { Test, TestingModule } from '@nestjs/testing';
import { UserLocationsController } from '../user-locations.controller';
import { UserLocationsService } from '../user-locations.service';

describe('UserLocationsController', () => {
  let controller: UserLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLocationsController],
      providers: [UserLocationsService],
    }).compile();

    controller = module.get<UserLocationsController>(UserLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
