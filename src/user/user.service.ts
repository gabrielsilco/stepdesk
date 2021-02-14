import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, getMongoRepository, ObjectID, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getAll(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    async create(newUserData: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(newUserData);
    }

    async update(userId: string, updatedUserData: CreateUserDto) {
        return this.userRepository.updateUser(userId, updatedUserData)
    }

    async delete(userId: string) {
        return this.userRepository.deleteUser(userId)
    }

    async findByName(searchText: string) {
        return this.userRepository.findUsersByName(searchText)
    }

    async findById(userId: string): Promise<User> {
        return this.userRepository.findUserById(userId)
    }
}
