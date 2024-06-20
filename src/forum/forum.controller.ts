import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { AccessTokenGuard, HeaderApiKeyGuard } from 'src/common/guards';
import { CreateForumChildDto, CreateForumParentDto } from './dto';
import { ForumService } from './forum.service';

@ApiTags('Forum Endpoints')
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('parent/total')
  @UseGuards(HeaderApiKeyGuard)
  async totalParent() {
    return this.forumService.totalParent();
  }

  @Get('child/total/:parentId')
  @UseGuards(HeaderApiKeyGuard)
  async totalChildren(@Param('parentId') parentId: string) {
    return this.forumService.totalChildren(parentId);
  }

  @Post('parent/create')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async createParent(
    @User('sub') userId: string,
    @Body() dto: CreateForumParentDto,
  ) {
    return this.forumService.createParent(userId, dto);
  }

  @Post('child/create')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async createChild(
    @User('sub') userId: string,
    @Body() dto: CreateForumChildDto,
  ) {
    return this.forumService.createChild(userId, dto);
  }

  @Get('parent/display/id/:id')
  @UseGuards(HeaderApiKeyGuard)
  async displayForumParentInfo(@Param('id') id: string) {
    return this.forumService.displayForumParentById(id);
  }

  @Get('parent/display/page/:page')
  @UseGuards(HeaderApiKeyGuard)
  async displayForumParent(@Param('page') page: number) {
    return this.forumService.displayForumParentByPage(page);
  }

  @Get('parent/display/search/:search')
  @UseGuards(HeaderApiKeyGuard)
  async displayForumParentBySearch(@Param('search') search: string) {
    return this.forumService.displayForumParentBySearch(search);
  }

  @Get('child/display/parent/:parentId/page/:page')
  @UseGuards(HeaderApiKeyGuard)
  async displayForumChildByParentId(
    @Param('parentId') parentId: string,
    @Param('page') page: number,
  ) {
    return this.forumService.displayForumChildByParentId(parentId, page);
  }
}
