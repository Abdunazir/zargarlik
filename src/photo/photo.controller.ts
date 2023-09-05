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
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';
import { AdminGuard } from '../guards/Admin.guard';

@ApiTags('photo') // Add tags for this controller
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}@UseGuards(JwtAuthGuard,AdminGuard)

  @Post()
  @ApiOperation({ summary: 'Create a new photo' })
  @ApiResponse({
    status: 201,
    description: 'The photo has been successfully created.',
  })
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }@UseGuards(JwtAuthGuard,AdminGuard)

  @Get()
  @ApiOperation({ summary: 'Get all photos' })
  @ApiResponse({ status: 200, description: 'Return a list of all photos.' })
  findAll() {
    return this.photoService.findAll();
  }@UseGuards(JwtAuthGuard,AdminGuard)

  @Get(':id')
  @ApiOperation({ summary: 'Get a photo by ID' })
  @ApiResponse({ status: 200, description: 'Return the specified photo.' })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }@UseGuards(JwtAuthGuard,AdminGuard)

  @Patch(':id')
  @ApiOperation({ summary: 'Update a photo by ID' })
  @ApiResponse({
    status: 200,
    description: 'The photo has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a photo by ID' })
  @ApiResponse({
    status: 200,
    description: 'The photo has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
