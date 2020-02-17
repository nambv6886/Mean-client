import { User } from '../user/user.model';

export class RegisterResponse {
  message: string;
  user: User;
  status: number;
}

export class LoginResponse {
  status: number;
  token: string;
  expiresIn: number;
  email: string;
  refreshToken: string;
  message: string;
}
