import { Test, TestingModule } from '@nestjs/testing';
import { UserLocationsService } from '../user-locations.service';

describe('UserLocationsService', () => {
  let service: UserLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLocationsService],
    }).compile();

    service = module.get<UserLocationsService>(UserLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
