import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'mongoose';
import { AuthService } from '../auth.service';
import { User } from '../../shared/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @InjectModel('User') private userModel: PassportLocalModel<User>,
  ) {
    super({ passwordField: 'password' });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validate(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
