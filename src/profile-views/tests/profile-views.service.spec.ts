import { Test, TestingModule } from '@nestjs/testing';
import { ProfileViewsService } from '../profile-views.service';

describe('ProfileViewsService', () => {
  let service: ProfileViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileViewsService],
    }).compile();

    service = module.get<ProfileViewsService>(ProfileViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
