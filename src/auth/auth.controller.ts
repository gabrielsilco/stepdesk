import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @Post('/login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ email:string, accessToken: string}> {
        return await this.authService.login(loginDto);

        //     "email": "diogo@nojo.com",
        //     "password": "euFed0"
    }

    @Post("/create")
    async create(@Body(ValidationPipe) newUserData: CreateUserDto) {
        return await this.userService.create(newUserData);
    }
}
