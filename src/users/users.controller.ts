import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @HttpCode(200)
  async getAllUsers(): Promise<SuccessResponse> {
    try {
      const users = await this.usersService.users({});
      return {
        message: 'Users found successfully',
        success: true,
        data: users,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id') userId: string): Promise<SuccessResponse> {
    try {
      const user = await this.usersService.user({ id: userId });
      return {
        message: 'User found successfully',
        success: true,
        data: user,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('signup')
  @HttpCode(201)
  async signupUser(@Body() userData: CreateUserDto): Promise<SuccessResponse> {
    try {
      const user = await this.usersService.createUser(userData);
      console.log(user);
      return {
        message: 'User created successfully',
        success: true,
        data: user,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
