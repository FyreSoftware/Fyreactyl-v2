import { Module } from '@nestjs/common';
import { PterodactylService } from './pterodactyl.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { PterodactylController } from './pterodactyl.controller';

@Module({
  imports: [ConfigModule, ConfigService],
  providers: [PterodactylService],
  exports: [PterodactylService],
  controllers: [PterodactylController],
})
export class PterodactylModule {}
