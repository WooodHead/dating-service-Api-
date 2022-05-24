import {
  Body,
  Controller,
  Post,
  Query,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalSignupDto } from './dto/local-auth.dto';
import { ValidateUserPropertiesDto } from './dto/validate-auth.dto';

import { JwtAuthGuard } from './jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('phone')
  async phone(@Query('access_token') token: string,) {
    return this.authService.phoneLogin(token);
  }

  @Post('signup')
  async signup(
    @Query('access_token') token: string,
    @Body() body: LocalSignupDto,
  ) {
    return this.authService.signup(token, body);
  }

  @Post('validate')
  async validate(@Body() body: ValidateUserPropertiesDto) {
    if (Object.keys(body).length === 0) {
      throw new UnprocessableEntityException('No properties to validate');
    }
    return this.authService.validateUserProperties(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const [, accessToken] = req.headers.authorization.split(' ');
    return this.authService.logout(accessToken);
  }
}
