import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, ObjectID, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        // @InjectRepository(User)
        // private userRepository: Repository<User>
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

    async delete(userId) {
        const manager = getMongoManager()
        const user = await manager.delete(User, { _id: userId})
        console.log(user)
        return user
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
}
