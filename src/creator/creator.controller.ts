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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger'; // Import Swagger decorators
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { CreatorService } from './creator.service';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';
import { AdminGuard } from '../guards/Admin.guard';

@Controller('creator')
@ApiTags('creator') // Add a tag for your controller
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new creator' })
  @ApiBody({ type: CreateCreatorDto }) // Specify the request body DTO
  @ApiResponse({
    status: 201,
    description: 'The creator has been successfully created.',
  })
  create(@Body() createCreatorDto: CreateCreatorDto) {
    return this.creatorService.create(createCreatorDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all creators' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all creators.',
  })
  findAll() {
    return this.creatorService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a creator by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiResponse({
    status: 200,
    description: 'The creator has been successfully retrieved.',
  })
  findOne(@Param('id') id: string) {
    return this.creatorService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a creator by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiBody({ type: UpdateCreatorDto }) // Specify the request body DTO
  @ApiResponse({
    status: 200,
    description: 'The creator has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorService.update(+id, updateCreatorDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a creator by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiResponse({
    status: 200,
    description: 'The creator has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.creatorService.remove(+id);
  }
}
