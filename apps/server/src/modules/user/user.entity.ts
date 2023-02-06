import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";
import { PasswordTransformer } from "./password.transformer";

@Entity({
  name: "users",
})
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: "password",
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  username: string;

  @Column({
    default: {},
  })
  pterodactyl: PterodactylInfo;

  @Column({
    default: {
      coins: 0,
    },
  })
  resources: UserResources;

  toJSON() {
    const { password, ...self } = this;
    return self;
  }
}

export class UserFillableFields {
  email: string;
  firstName: string;
  username: string;
  lastName: string;
  password: string;
}
export interface PterodactylInfo {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  root_admin: boolean;
  created_at: string;
}
export interface UserResources {
  coins: number;
}
