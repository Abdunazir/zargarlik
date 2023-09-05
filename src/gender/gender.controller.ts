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
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/Admin.guard';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';

@ApiTags('gender') // Add tags for this controller
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new gender' })
  @ApiResponse({
    status: 201,
    description: 'The gender has been successfully created.',
  })
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all genders' })
  @ApiResponse({ status: 200, description: 'Return a list of all genders.' })
  findAll() {
    return this.genderService.findAll();
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a gender by ID' })
  @ApiResponse({ status: 200, description: 'Return the specified gender.' })
  @ApiResponse({ status: 404, description: 'Gender not found.' })
  findOne(@Param('id') id: string) {
    return this.genderService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a gender by ID' })
  @ApiResponse({
    status: 200,
    description: 'The gender has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Gender not found.' })
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(+id, updateGenderDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gender by ID' })
  @ApiResponse({
    status: 200,
    description: 'The gender has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Gender not found.' })
  remove(@Param('id') id: string) {
    return this.genderService.remove(+id);
  }
}
