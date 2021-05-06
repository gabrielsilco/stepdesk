import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-interface.payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,

        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<{ email: string, accessToken: string }> {
        const email = await this.userRepository.validateUserPassword(loginDto);
        
        if (!email) {
            throw new UnauthorizedException('Invalid credentials.')
        }

        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);

        return { email, accessToken };
    }
}
