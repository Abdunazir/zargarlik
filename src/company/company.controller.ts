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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';
import { AdminGuard } from '../guards/Admin.guard';

@ApiTags('company') // Add tags for this controller
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'The company has been successfully created.',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return a list of all companies.' })
  findAll() {
    return this.companyService.findAll();
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Return the specified company.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiResponse({
    status: 200,
    description: 'The company has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiResponse({
    status: 200,
    description: 'The company has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
