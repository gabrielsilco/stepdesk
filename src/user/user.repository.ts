import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, getMongoManager, getMongoRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "src/auth/dto/login.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getAllUsers(): Promise<User[]> {
        const manager = getMongoManager();
        return manager.find(User)
    }

    async createUser(newUserData: CreateUserDto): Promise<User> {
        const manager = getMongoManager();
        const newUser = new User()
        const { firstName, lastName, email, password } = newUserData;

        const salt = await bcrypt.genSalt();



        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await this.hashPassword(password, salt);
        newUser.salt = salt;

        try {
            await manager.save(newUser)
            return newUser
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('E-mail already registered.')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateUser(userId: string, updatedUserData: CreateUserDto) {
        const manager = getMongoRepository(User);
        manager.update(userId, updatedUserData)
    }

    async deleteUser(userId: string) {
        const manager = getMongoRepository(User)
        const user = await manager.findOne(userId)
        manager.delete(user)
    }

    async findUsersByName(searchText: string) {
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

    async findUserById(userId: string) {
        const manager = getMongoRepository(User)
        return await manager.findOne(userId);
    }

    async validateUserPassword(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const manager = getMongoRepository(User);

        const user = await manager.findOne({email});
        if (user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}