import { Controller, Get } from '@nestjs/common';
import { PterodactylService } from './pterodactyl.service';

@Controller('pterodactyl')
export class PterodactylController {
  constructor(private pteroService: PterodactylService) {}

  @Get('/eggs')
  async getEggs() {
    return this.pteroService.getAllEggs();
  }

  @Get('/nodes')
  async getNodes() {
    return this.pteroService.getAllNodes();
  }
}
