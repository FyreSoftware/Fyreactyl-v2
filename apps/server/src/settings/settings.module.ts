import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PterodactylModule } from '../pterodactyl/pterodactyl.module';
import { SettingsSchema } from './schemas/settings.schema';

@Module({
  providers: [SettingsService],
  imports: [PterodactylModule, MongooseModule.forFeature([{ name: 'Settings', schema: SettingsSchema }])],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
