import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Get all users')
  findAll(
    @Query() query: any,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.usersService.findAll(
      query,
      Number(page || 1),
      Number(limit || 10),
    );
  }

  @Get(':id')
  @ResponseMessage('Get user by id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update user by id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete user by id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
