import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../guards/1jwt-auth.guard';
import { AdminGuard } from '../guards/Admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiOperation({ summary: 'Signup user' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginUserDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginUserDto, res);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  
  @UseGuards(JwtAuthGuard,AdminGuard)// @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Refresh user' })
  @ApiResponse({ status: 200, type: Admin })
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiOperation({ summary: 'Activate user' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Get("all")
  findAll() {
    return this.adminService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
