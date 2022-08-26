import {
  Controller, Get, Param, Query,
} from '@nestjs/common';
import { PterodactylService } from '../pterodactyl/pterodactyl.service';

@Controller('settings')
export class SettingsController {
  constructor(private pteroService: PterodactylService) {}

  @Get('/eggs/:id/environment')
  eggEnvironment(@Query() query, @Param() param) {
    return this.pteroService.getEggEnvironment(param.id, query.nest);
  }
}
