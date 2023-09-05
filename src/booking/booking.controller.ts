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
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';
import { AdminGuard } from '../guards/Admin.guard';
import { UserGuard } from '../guards/user.guard';

@Controller('booking')
@ApiTags('booking') // Add a tag for your controller
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto }) // Specify the request body DTO
  @ApiResponse({
    status: 201,
    description: 'The booking has been successfully created.',
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all bookings.',
  })
  findAll() {
    return this.bookingService.findAll();
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully retrieved.',
  })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a booking by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiBody({ type: UpdateBookingDto }) // Specify the request body DTO
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiParam({ name: 'id', type: 'number' }) // Specify the parameter
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
