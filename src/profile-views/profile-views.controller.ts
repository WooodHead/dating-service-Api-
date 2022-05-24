import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProfileViewsService } from './profile-views.service';
import { CreateProfileViewDto } from './dto/create-profile-view.dto';
import { ListProfileViewDto } from './dto/list-profile-view.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('Profile Views')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile-views')
export class ProfileViewsController {
  constructor(private readonly profileViewsService: ProfileViewsService) {}

  @Post()
  create(@Req() req, @Body() createProfileViewDto: CreateProfileViewDto) {
    return this.profileViewsService.create({
      userId: req.user.id,
      data: createProfileViewDto,
    });
  }

  @Get()
  findAll(@Req() req, @Query() query: ListProfileViewDto) {
    return this.profileViewsService.findAll({
      user: req.user,
      query,
    });
  }
}
