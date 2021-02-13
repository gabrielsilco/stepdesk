import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, getMongoRepository, ObjectID, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getAll(): Promise<User[]> {
        const manager = getMongoManager();
        return manager.find(User)
    }

    async create(newUserData: CreateUserDto): Promise<User> {
        const manager = getMongoManager();
        const newUser = new User()
        const { firstName, lastName, email, password } = newUserData;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        return manager.save(newUser)
    }

    async update(userId: string, updatedUserData: CreateUserDto) {
        const manager = getMongoRepository(User);
        manager.update(userId, updatedUserData)
    }

    async delete(userId: string) {
        const manager = getMongoRepository(User)
        const user = await manager.findOne(userId)
        manager.delete(user)
    }

    async findByName(searchText) {
        const manager = getMongoManager()
        return await manager.find(User,{
            where: {
                $or: [
                    { firstName: searchText },
                    { firstName: searchText }
                ]
            }
        })
    }

    async findById(userId: string): Promise<User> {
        const manager = getMongoRepository(User)
        return await manager.findOne(userId);
    }
}
