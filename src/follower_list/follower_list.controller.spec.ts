import { Test, TestingModule } from '@nestjs/testing';
import { FollowerListController } from './follower_list.controller';

describe('FollowerListController', () => {
  let controller: FollowerListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowerListController],
    }).compile();

    controller = module.get<FollowerListController>(FollowerListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
