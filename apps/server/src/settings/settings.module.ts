import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PterodactylModule } from '../pterodactyl/pterodactyl.module';

@Module({
  providers: [SettingsService],
  imports: [PterodactylModule],
  controllers: [SettingsController],
})
export class SettingsModule {}
