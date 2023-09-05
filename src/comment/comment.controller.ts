import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';
import { AdminGuard } from '../guards/Admin.guard';
import { UserGuard } from '../guards/user.guard';

@ApiTags('comment') // Add tags for this controller
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, AdminGuard, UserGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard, UserGuard)
  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Return a list of all comments.' })
  findAll() {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard, UserGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Return the specified comment.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard, UserGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard, UserGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
