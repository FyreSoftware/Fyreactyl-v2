import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Hash } from "../../utils/Hash";
import { ConfigService } from "./../config";
import { User, UsersService } from "./../user";
import { LoginPayload } from "./login.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {}

  async createToken(user: User) {
    return {
      expiresIn: 3600 * 60 * 24 * 7,
      accessToken: this.jwtService.sign({ id: user._id }),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException("Invalid credentials!");
    }
    return user;
  }
}
