import { Test, TestingModule } from '@nestjs/testing';
import { PterodactylService } from './pterodactyl.service';

describe('PterodactylService', () => {
  let service: PterodactylService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PterodactylService],
    }).compile();

    service = module.get<PterodactylService>(PterodactylService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
