import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { RefreshCountsService } from './refresh-counts.service';

@ApiTags('Refresh Counts')
@UseGuards(JwtAuthGuard)
@Controller('refresh-counts')
export class RefreshCountsController {
  constructor(private readonly refreshCountsService: RefreshCountsService) {}

  @Post()
  create(@Req() req) {
    return this.refreshCountsService.create(req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.refreshCountsService.findOne(req.user);
  }
}
