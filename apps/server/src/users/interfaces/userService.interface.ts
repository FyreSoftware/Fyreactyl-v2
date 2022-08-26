import { CreateUserLocalDto } from '../../shared/dto/createUserLocal.dto';
import { CreateUserOAuthDto } from '../../shared/dto/createUserOAuth.dto';
import { respMessage } from '../../shared/interfaces/respMessage.interface';
import { User } from '../../shared/interfaces/user.interface';

export interface UserService {
  publicFields(): string[];
  signUpWithLocalStrategy(createUser: CreateUserLocalDto): Promise<respMessage>;
  signUpOrSignInWithOAuth(createUser: CreateUserOAuthDto): Promise<User | null>;
  getUser(userId: string): Promise<any>;
}
export interface PterodactylInfo {
  id: number,
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  root_admin: boolean;
  created_at: string;
}
