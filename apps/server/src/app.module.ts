import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { PterodactylModule } from './pterodactyl/pterodactyl.module';
import { ConfigModule } from './config/config.module';
import { SettingsModule } from './settings/settings.module';

require('dotenv').config({ path: '../../.env' });
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    PterodactylModule,
    ConfigModule,
    SettingsModule,
  ],
})
export class AppModule {}
