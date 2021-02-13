import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/all")
    async getAllUsers() {
        return await this.userService.getAll();
    }

    @Get("/findByName/:searchText")
    async findUserByName(@Param('searchText') searchText: string) {
        return await this.userService.findByName(searchText)
    }

    @Post("/create")
    async create(@Body() newUserData: CreateUserDto) {
        return await this.userService.create(newUserData);
    }

    @Delete("/delete/:userId")
    async delete(@Param('userId') userId: string) {
        return await this.userService.delete(userId)
    }
}
