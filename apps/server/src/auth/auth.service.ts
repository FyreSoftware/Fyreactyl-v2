import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../shared/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: PassportLocalModel<User>,
  ) {}

  async login(user: any) {
    const payload = { id: user.id };
    return {
      success: true,
      token: this.jwtService.sign(payload),
      response: {
        message: 'Login Successfully',
      },
    };
  }

  async validate(nameOrEmail: string, password: string) {
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (emailRegex.test(nameOrEmail)) {
      const usere = await this.userModel.findOne({
        email: nameOrEmail,
      }).exec();
      const { user } = await this.userModel.authenticate()(usere.username, password);
      if (!user) return null;
      return user;
    }
    const usere = await this.userModel.findOne({
      username: nameOrEmail,
    }).exec();
    const { user } = await this.userModel.authenticate()(usere.username, password);
    if (!user) return null;
    return user;
  }

  async signup(user: any) {
    const payload = { id: user.id };
    return {
      success: true,
      token: this.jwtService.sign(payload),
      response: {
        message: 'Signup Successfully',
      },
    };
  }
}
