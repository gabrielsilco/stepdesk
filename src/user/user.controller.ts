import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/all")
    async getAllUsers() {
        return await this.userService.getAll();
    }

    @Get("/:userId")
    async findUserById(@Param('userId') userId: string) {
        return await this.userService.findById(userId)
    }

    @Get("/findByName/:searchText")
    async findUserByName(@Param('searchText') searchText: string) {
        return await this.userService.findByName(searchText)
    }

    @Post("/create")
    async create(@Body(ValidationPipe) newUserData: CreateUserDto) {
        return await this.userService.create(newUserData);
    }

    @Post("/update/:userId")
    async update(@Param('userId') userId: string, @Body() updatedUserData: CreateUserDto) {
        return await this.userService.update(userId, updatedUserData)
    }

    @Delete("/delete/:userId")
    async delete(@Param('userId') userId: string) {
        return await this.userService.delete(userId)
    }
}
