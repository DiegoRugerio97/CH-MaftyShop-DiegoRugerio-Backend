// Service class for Users
// Imports
import UserDAO from "../DAOs/Mongo/user.dao.js"

// User DAO
const userDAO = new UserDAO()

class UserService{

    async getUserByEmail(email){
        return await userDAO.getUserByEmail(email)
    }

    async createUser(userObj){
        return await userDAO.createUser(userObj)
    }

    async getUserById(id){
        return await userDAO.getUserById(id)
    }
}

export default UserService