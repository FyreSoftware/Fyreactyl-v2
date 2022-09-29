import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/users.schema';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PoliciesGuard } from './guards/casl-policy.guard';
import { CaslAbilityFactory } from '../shared/casl/casl-ability.factory';
import { PterodactylModule } from '../pterodactyl/pterodactyl.module';
import { ConfigModule } from '../config/config.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    PterodactylModule,
    SettingsModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MulterModule.register({
      dest: 'public/images/users',
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|gif|png)$/)) {
          cb(new Error('You can only upload image files'), null);
        }
        cb(null, true);
      },
    }),
  ],
  providers: [UsersService, JwtStrategy, PoliciesGuard, CaslAbilityFactory],
  controllers: [UsersController],
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class UsersModule {}
