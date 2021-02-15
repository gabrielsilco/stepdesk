import { EntityRepository, getMongoManager, getMongoRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

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
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        await manager.save(newUser)
        return newUser
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
}