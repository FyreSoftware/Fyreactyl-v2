import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'mongoose';
import * as lodash from 'lodash';
import { User } from '../shared/interfaces/user.interface';
import { CreateUserLocalDto } from '../shared/dto/createUserLocal.dto';
import { CreateUserOAuthDto } from '../shared/dto/createUserOAuth.dto';
import { respMessage } from '../shared/interfaces/respMessage.interface';
import { UserService } from './interfaces/userService.interface';
import { PterodactylService } from '../pterodactyl/pterodactyl.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class UsersService implements UserService {
  constructor(
    @InjectModel('User') private userModel: PassportLocalModel<User>,
    private pterodactylService: PterodactylService,
    private settingService: SettingsService,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  publicFields(): string[] {
    return [
      'id',
      'displayName',
      'email',
      'firstName',
      'lastName',
      'avatarUrl',
      'isAdmin',
      'createdAt',
      'emailActivated',
    ];
  }

  async signUpWithLocalStrategy({
    username,
    email,
    password,
    firstName = '',
    lastName = '',
  }: CreateUserLocalDto): Promise<respMessage> {
    let result: respMessage = {
      success: true,
      response: {
        message: 'Registration Successful',
      },
    };
    const registeredEmail = await this.userModel.findOne({ email });
    const registeredUsername = await this.userModel.findOne({ username });

    if (!email) result = { success: false, response: { message: 'Email is Required' } };
    else if (!username) {
      result = {
        success: false,
        response: { message: 'Username is Required' },
      };
    } else if (!password) {
      result = {
        success: false,
        response: { message: 'Password is Required' },
      };
    } else if (!email.match(/.+@.+\..+/)) {
      result = {
        success: false,
        response: {
          message: 'Invalid Email. Email should be like abc@example.com',
        },
      };
    } else if (password.trim().length < 8) {
      result = {
        success: false,
        response: {
          message:
            'Invalid Password. Password need to be at least 8 characters.',
        },
      };
    } else if (registeredEmail) {
      result = {
        success: false,
        response: {
          message:
            'Email already exists. Please sign up with different email or login.',
        },
      };
    } else if (registeredUsername) {
      return {
        success: false,
        response: {
          message:
            'Username already exists. Please sign up with different username or login.',
        },
      };
    } else if (await this.isFirstUser()) {
      const settings = await this.settingService.getSettings();
      const ptero = await this.pterodactylService.createUser({
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        admin: true,
      });
      if (ptero?.error) {
        return {
          success: false,
          response: {
            message:
            ptero?.data,
          },
        };
      }
      this.userModel.register(
        // eslint-disable-next-line new-cap
        new this.userModel({
          username,
          firstName,
          lastName,
          displayName: username,
          email,
          isAdmin: true,
          resources: {
            coins: 0,
          },
          package: settings.packages[0].id,
          pterodactyl: {
            id: ptero.id,
            username: ptero.username,
            email: ptero.email,
            first_name: ptero.first_name,
            last_name: ptero.last_name,
            root_admin: ptero.root_admin,
            created_at: ptero.created_at,
          },
        }),
        password.trim(),
        (err) => {
          if (err) result = { success: false, response: { message: err.toString() } };
        },
      );
    } else {
      const settings = await this.settingService.getSettings();

      const ptero = await this.pterodactylService.createUser({
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      if (ptero.error) {
        return {
          success: false,
          response: {
            message:
                ptero.data,
          },
        };
      }
      await this.userModel.register(
        // eslint-disable-next-line new-cap
        new this.userModel({
          username,
          firstName,
          lastName,
          displayName: username,
          email,
          resources: {
            coins: 0,
          },
          package: settings.packages[0].id,
          pterodactyl: {
            id: ptero.id,
            username: ptero.username,
            email: ptero.email,
            first_name: ptero.first_name,
            last_name: ptero.last_name,
            root_admin: ptero.root_admin,
            created_at: ptero.created_at,
          },
        }),
        password.trim(),
        (err) => {
          if (err) result = { success: false, response: { message: err.toString() } };
        },
      );
    }
    return result;
  }

  async isFirstUser(): Promise<boolean> {
    const userArr = await this.userModel.find({});

    if (userArr.length) return false;
    return true;
  }

  async signUpOrSignInWithOAuth({
    OAuthId,
    email,
    displayName,
    avatarUrl,
  }: CreateUserOAuthDto): Promise<User | null> {
    let user: User;
    const registeredEmail = await this.userModel.findOne({ email });
    const registeredUser = await this.userModel.findOne({ OAuthId });
    if (registeredEmail) user = registeredEmail;
    else if (!registeredUser) {
      if (await this.isFirstUser()) {
        const settings = await this.settingService.getSettings();

        const ptero = await this.pterodactylService.createUser({
          username: displayName,
          first_name: displayName,
          last_name: displayName,
          email,
          admin: true,
        });
        const newUser = await this.userModel.create({
          OAuthId,
          email,
          displayName,
          avatarUrl,
          username: OAuthId,
          resources: {
            coins: 0,
          },
          package: settings.packages[0].id,
          isAdmin: true,
          pterodactyl: ptero,
        });
        user = newUser;
      } else {
        const settings = await this.settingService.getSettings();

        const ptero = await this.pterodactylService.createUser({
          username: displayName,
          first_name: displayName,
          last_name: displayName,
          email,
          admin: false,
        });
        const newUser = await this.userModel.create({
          OAuthId,
          email,
          displayName,
          avatarUrl,
          resources: {
            coins: 0,
          },
          username: OAuthId,
          pterodactyl: ptero,
          package: settings.packages[0].id,

        });
        user = newUser;
      }
    } else {
      user = registeredUser;
    }
    return user;
  }

  async activateUserEmail(userId: string): Promise<respMessage> {
    // 1. Use findById to find an user
    // 2. If not, throw an error
    // 3. If yes, use updateOne to update the emailActivated to true
    // 4. Then, send an welcome email, return success
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw Error("The user doesn't exist");
      await this.userModel
        .updateOne(
          { _id: userId },
          { $set: { emailActivated: true }, new: true },
        )
        .exec();
      return {
        success: true,
        response: {
          user: { displayName: user.displayName, email: user.email },
        },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async resetPassword(password: string, email: string): Promise<respMessage> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      try {
        await user.setPassword(password);
        await user.save();
        return {
          success: true,
          response: { message: 'Password Reset Successfully' },
        };
      } catch (err) {
        return {
          success: false,
          response: { message: err.message || err.toString() },
        };
      }
    }
    return { success: false, response: { message: 'No user with this email' } };
  }

  async getUsers(): Promise<respMessage> {
    try {
      const users = await this.userModel.find({}).exec();
      return { success: true, response: { users } };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async getProfile(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return { success: false, response: { message: 'User Not Found' } };
    return {
      success: true,
      response: { user: lodash.pick(user, this.publicFields()) },
    };
  }

  async getUser(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async modifyUser(userId: string, updatedFields: any): Promise<respMessage> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: { ...updatedFields } },
        { new: true },
      );
      if (!user) throw new Error('User Not Found');
      return {
        success: true,
        response: { message: 'Update User Profile Successfully' },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async deleteUser(userId: string): Promise<respMessage> {
    try {
      const user = await this.userModel.findByIdAndRemove(userId).exec();
      if (!user) throw new Error('User Not Found');
      return {
        success: true,
        response: { message: 'Delete User Account Successfully' },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async deleteUsers(): Promise<respMessage> {
    try {
      const user = await this.userModel.remove({ admin: false }).exec();
      if (!(user as any)) throw new Error('Something went wrong');
      return {
        success: true,
        response: { message: 'Delete Users Successfully' },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }
}
