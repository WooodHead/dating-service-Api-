import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserBlocksService } from './user-blocks.service';
import { CreateUserBlockDto } from './dto/create-user-block.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { ListUserBlockDto } from './dto/list-user-block.dto';

@ApiTags('User Blocks')
@UseGuards(JwtAuthGuard)
@Controller('user-blocks')
export class UserBlocksController {
  constructor(private readonly userBlocksService: UserBlocksService) {}

  @Post()
  create(@Req() req, @Body() createUserBlockDto: CreateUserBlockDto) {
    return this.userBlocksService.create(req.user.id, createUserBlockDto);
  }

  @Get()
  findAll(@Req() req, @Query() query: ListUserBlockDto) {
    return this.userBlocksService.findAll({
      requestUserId: req.user.id,
      query,
    });
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.userBlocksService.remove({
      id: id,
      requestUserId: req.user.id,
    });
  }
}
