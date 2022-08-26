import { Module } from '@nestjs/common';
import { PterodactylService } from './pterodactyl.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ConfigModule, ConfigService],
  providers: [PterodactylService],
  exports: [PterodactylService],
})
export class PterodactylModule {}
