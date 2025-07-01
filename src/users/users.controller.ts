import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getUserById(@Param('id') id) {
    return this.usersService.getUserById(id);
  }
  @Post()
  create(@Body() CreateUserDto: CreateUserDto){
    return this.usersService.createUser(CreateUserDto)
  }
  @Delete(':id')
  deleteUserById(@Param('id') id) {
    return this.usersService.deleteUserById(id);
  }
  @Put(':id')
  updateUserById(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(id, updateUserDto);
  }
}
