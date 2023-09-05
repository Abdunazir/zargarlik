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
import { CreateJewerlyDto } from './dto/create-jewerly.dto';
import { UpdateJewerlyDto } from './dto/update-jewerly.dto';
import { JewerlyService } from './jewerly.service';
import { AdminGuard } from '../guards/Admin.guard';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';

@Controller('jewerly')
@ApiTags('jewerly') // Add a tag for your controller
export class JewerlyController {
  constructor(private readonly jewerlyService: JewerlyService) {}

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new jewelry item' })
  @ApiBody({ type: CreateJewerlyDto }) // Specify the request body DTO
  @ApiResponse({
    status: 201,
    description: 'The jewelry item has been successfully created.',
  })
  create(@Body() createJewerlyDto: CreateJewerlyDto) {
    return this.jewerlyService.create(createJewerlyDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all jewelry items' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all jewelry items.',
  })
  findAll() {
    return this.jewerlyService.findAll();
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a jewelry item by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiResponse({
    status: 200,
    description: 'The  item has been successfully retrieved.',
  })
  findOne(@Param('id') id: string) {
    return this.jewerlyService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a jewelry item by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiBody({ type: UpdateJewerlyDto }) // Specify the request body DTO
  @ApiResponse({
    status: 200,
    description: 'The jewelry item has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateJewerlyDto: UpdateJewerlyDto) {
    return this.jewerlyService.update(+id, updateJewerlyDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a jewelry item by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiResponse({
    status: 200,
    description: 'The jewelry item has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.jewerlyService.remove(+id);
  }
}
