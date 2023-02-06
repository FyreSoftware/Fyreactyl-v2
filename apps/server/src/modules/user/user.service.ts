import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PterodactylService } from "modules/pterodactyl/pterodactyl.service";
import { Repository } from "typeorm";
import { Hash } from "utils/Hash";

import { User, UserFillableFields } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private pterodactylService: PterodactylService
  ) {}

  async get(id: number) {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }
  async isFirstUser(): Promise<boolean> {
    const userArr = await this.userRepository.find({});

    if (userArr.length > 0) return false;
    return true;
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        "User with provided email already created."
      );
    }
    const ptero = await this.pterodactylService.createUser({
      email: payload.email,
      username: payload.username,
      first_name: payload.firstName,
      last_name: payload.lastName,
      password: payload.password,
      admin: await this.isFirstUser(),
    });
    return await this.userRepository.save({
      ...payload,
      password: Hash.make(payload.password),
      passwordConfirmation: Hash.make(payload.password),
      pterodactyl: {
        id: ptero.id,
        username: ptero.username,
        email: ptero.email,
        first_name: ptero.first_name,
        last_name: ptero.last_name,
        root_admin: ptero.root_admin,
        created_at: ptero.created_at,
      },
      isAdmin: await this.isFirstUser(),
    });
  }
}
