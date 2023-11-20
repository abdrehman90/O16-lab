import { Test, TestingModule } from '@nestjs/testing';
import { FollowerListService } from './follower_list.service';

describe('FollowerListService', () => {
  let service: FollowerListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowerListService],
    }).compile();

    service = module.get<FollowerListService>(FollowerListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
