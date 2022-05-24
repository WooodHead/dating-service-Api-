import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { QueryTopicDto } from './dto/query-topic.dto';

@ApiTags('Topics')
@UseGuards(JwtAuthGuard)
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Req() req, @Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll(@Req() req, @Query() query: QueryTopicDto) {
    return this.topicsService.findAll(query);
  }

  @Delete('/:id')
  removeOne(@Req() req, @Param('id') id: string) {
    return this.topicsService.remove(id);
  }
}
