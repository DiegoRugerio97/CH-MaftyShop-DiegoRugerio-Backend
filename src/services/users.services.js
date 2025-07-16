// Service class for Users
// Import repository instances
import { usersRepository } from "../Repositories/index.repository.js"
// Mail Transport
import { generateToken, sendPasswordResetMail, verifySign, createHash, isPasswordValid} from "../util.js"
import UserDTO from "../DTOs/user.dto.js"

class UsersService {

    async getUserByEmail(email) {
        return await usersRepository.getUserByEmail(email)
    }

    async createUser(userObj) {
        return await usersRepository.createUser(userObj)
    }

    async getUserById(id) {
        return await usersRepository.getUserById(id)
    }

    async forgetPasswordProcess(email, URL) {
        const user = await usersRepository.getUserByEmail(email)
        if (!user) {
            return null
        }
        const userInfo = new UserDTO(user)  
        const token = generateToken({id: userInfo.id, email: userInfo.email}, '1h')
        await sendPasswordResetMail(token, email, URL)
        return 'OK'
    }

    async resetPassword(newPassword, token){
        const credentials = verifySign(token)
        if(!credentials){
            throw 'Invalid token'
        }
        const {id, email} = credentials.payload
        const user = await usersRepository.getUserByEmail(email)
        const samePassword = isPasswordValid(user, newPassword)
        if (samePassword){
            throw 'Password cannot be the same'
        }
        const hashedPassword = createHash(newPassword)
        await usersRepository.updateUserPasswordById(id, hashedPassword)
        return 'User Password updated succesfully'
        

    }
}

export default UsersService