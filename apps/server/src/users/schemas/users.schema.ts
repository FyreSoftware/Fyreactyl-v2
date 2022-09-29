// eslint-disable-next-line max-classes-per-file
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { PterodactylInfo, UserResources } from '../interfaces/userService.interface';

export type UserDocument = User & Document;
export class Users {
  Users: User[];
}

@Schema()
export class User {
  OAuthId: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    match: /.+@.+\..+/,
  })
  email: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  displayName: string;

  @Prop({ default: '' })
  avatarUrl: string;

  @Prop({ default: false })
  emailActivated: boolean;

  @Prop({ type: Object, default: {} })
  pterodactyl: PterodactylInfo;

  @Prop({
    type: Object,
    default: {
      coins: 0,
    },
  })
  resources: UserResources;

  @Prop({
    type: Number,
  })
  package: number;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(passportLocalMongoose);

export { UserSchema };
