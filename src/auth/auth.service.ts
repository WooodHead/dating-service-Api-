import { UserSessionsService } from './../user-sessions/user-sessions.service';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PhoneAuthService } from './phone.service';

import { LocalSignupDto } from './dto/local-auth.dto';
import { ValidateUserPropertiesDto } from './dto/validate-auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private phoneAuthService: PhoneAuthService,
    private usersService: UsersService,
    private userSessionsService: UserSessionsService,
    private jwtService: JwtService,
  ) {}

  async phoneLogin(token: string) {
    try {
      const phoneUser = await this.phoneAuthService.validate(token);
      if (!phoneUser) {
        throw new BadRequestException('Invalid token');
      }
      const user = await this.usersService.findOne({
        phoneNumber: phoneUser.phoneNumber,
      });
      const jwtToken = this.jwtService.sign(user);
      this.userSessionsService.create({
        userId: user.id.toString(),
        accessToken: jwtToken,
      });
      return { jwtToken };
    } catch (e) {
      this.logger.warn(e);
      throw new BadRequestException();
    }
  }

  async signup(token: string, body: LocalSignupDto) {
    // const phoneUser = await this.phoneAuthService.validate(token);
    // if (
    //   !phoneUser?.phoneNumber ||
    //   phoneUser?.phoneNumber !== body.phoneNumber
    // ) {
    //   throw new BadRequestException('Invalid token');
    // }

    const user = await this.usersService.createLocal(body);
    if (!user.id) {
      throw new BadRequestException('User not created');
    }
    const jwtToken = this.jwtService.sign(user);
    this.userSessionsService.create({
      userId: user.id,
      accessToken: jwtToken,
    });
    return { jwtToken, user };
  }

  async getProfile(user: any) {
    return this.usersService.findOne({
      id: user.id,
    });
  }

  async validateUserProperties(body: ValidateUserPropertiesDto) {
    const resp = await this.usersService.validateUser(body);
    if (!resp) {
      throw new UnprocessableEntityException('Property already occupied');
    }
    return {
      resp,
    };
  }

  async logout(accessToken: string) {
    const resp = await this.userSessionsService.remove(accessToken);
    return {
      msg: `${resp.userId} logged out successfully.`,
    };
  }
}
