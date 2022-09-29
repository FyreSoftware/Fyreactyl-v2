import { Test, TestingModule } from '@nestjs/testing';
import { PterodactylController } from './pterodactyl.controller';

describe('PterodactylController', () => {
  let controller: PterodactylController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PterodactylController],
    }).compile();

    controller = module.get<PterodactylController>(PterodactylController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
