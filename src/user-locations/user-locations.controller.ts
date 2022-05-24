
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserLocationsService } from './user-locations.service';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { NearByUserDto } from './dto/near-by-user.dto';

@ApiTags('User Locations')
@UseGuards(JwtAuthGuard)
@Controller('user-locations')
export class UserLocationsController {
  constructor(private readonly userLocationsService: UserLocationsService) {}

  @Post()
  create(@Req() req, @Body() createUserLocationDto: CreateUserLocationDto) {
    return this.userLocationsService.create(req.user.id, createUserLocationDto);
  }

  @Get()
  findOne(@Req() req) {
    return this.userLocationsService.findOne(req.user.id);
  }

  @Get('nearby')
  findNearBy(@Req() req, @Query() query: NearByUserDto) {
    return this.userLocationsService.findNearBy({
      user: req.user,
      query
    });
  }
}
