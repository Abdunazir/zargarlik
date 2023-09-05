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
import { JewerlyTypeService } from './jewerly_type.service';
import { CreateJewerlyTypeDto } from './dto/create-jewerly_type.dto';
import { UpdateJewerlyTypeDto } from './dto/update-jewerly_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/Admin.guard';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';

@ApiTags('jewerly-type') // Add tags for this controller
@Controller('jewerly-type')
export class JewerlyTypeController {
  constructor(private readonly jewerlyTypeService: JewerlyTypeService) {}

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new jewelry type' })
  @ApiResponse({
    status: 201,
    description: 'The jewelry type has been successfully created.',
  })
  create(@Body() createJewerlyTypeDto: CreateJewerlyTypeDto) {
    return this.jewerlyTypeService.create(createJewerlyTypeDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all jewelry types' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of all jewelry types.',
  })
  findAll() {
    return this.jewerlyTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a jewelry type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the specified jewelry type.',
  })
  @ApiResponse({ status: 404, description: 'Jewelry type not found.' })
  findOne(@Param('id') id: string) {
    return this.jewerlyTypeService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a jewelry type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The jewelry type has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Jewelry type not found.' })
  update(
    @Param('id') id: string,
    @Body() updateJewerlyTypeDto: UpdateJewerlyTypeDto,
  ) {
    return this.jewerlyTypeService.update(+id, updateJewerlyTypeDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a jewelry type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The jewelry type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Jewelry type not found.' })
  remove(@Param('id') id: string) {
    return this.jewerlyTypeService.remove(+id);
  }
}
