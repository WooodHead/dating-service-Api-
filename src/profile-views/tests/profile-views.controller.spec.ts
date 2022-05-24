import { Test, TestingModule } from '@nestjs/testing';
import { ProfileViewsController } from '../profile-views.controller';
import { ProfileViewsService } from '../profile-views.service';

describe('ProfileViewsController', () => {
  let controller: ProfileViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileViewsController],
      providers: [ProfileViewsService],
    }).compile();

    controller = module.get<ProfileViewsController>(ProfileViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
