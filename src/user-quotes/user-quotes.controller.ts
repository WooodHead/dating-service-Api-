import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserQuotesService } from './user-quotes.service';
import { CreateUserQuoteDto } from './dto/create-user-quote.dto';

@ApiTags('User Quotes')
@UseGuards(JwtAuthGuard)
@Controller('user-quotes')
export class UserQuotesController {
  constructor(private readonly userQuotesService: UserQuotesService) {}

  @Post()
  create(@Req() req, @Body() createUserQuoteDto: CreateUserQuoteDto) {
    return this.userQuotesService.create(req.user, createUserQuoteDto);
  }

  @Get()
  findOne(@Req() req ) {
    return this.userQuotesService.findOne(req.user.id);
  }

  @Get('/nearby')
  findNearby(@Req() req){
    return this.userQuotesService.findNearBy(req.user)
  }

  @Post('/:id/like')
  likeQuote(@Req() req, @Param('id') id: string) {
    return this.userQuotesService.likeQuote({requestedUserId: req.user.id, quoteUserId: id})
  }

  @Post('/:id/dislike')
  dislikeQuote(@Req() req, @Param('id') id: string) {
    return this.userQuotesService.dislikeQuote({requestedUserId: req.user.id, quoteUserId: id})
  }

  @Get('matched')
  matchedQuotes(@Req() req){
    return this.userQuotesService.matched(req.user)
  }

  @Delete()
  remove(@Req() req) {
    return this.userQuotesService.remove(req.user.id);
  }
}
