import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PterodactylModule } from 'modules/pterodactyl/pterodactyl.module';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PterodactylModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
