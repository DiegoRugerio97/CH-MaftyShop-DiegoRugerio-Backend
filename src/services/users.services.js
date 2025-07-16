// Service class for Users
// Import repository instances
import {usersRepository} from "../Repositories/index.repository.js"

class UsersService{

    async getUserByEmail(email){
        return await usersRepository.getUserByEmail(email)
    }

    async createUser(userObj){
        return await usersRepository.createUser(userObj)
    }

    async getUserById(id){
        return await usersRepository.getUserById(id)
    }
}

export default UsersService