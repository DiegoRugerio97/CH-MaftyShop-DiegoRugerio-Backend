// Repository class for Users

class UsersRepository {
    constructor(DAO){
        this.usersDAO = DAO
    }
    async getUserByEmail(email) {
        return await  this.usersDAO.getUserByEmail(email)
    }

    async createUser(userObj) {
        return await this.usersDAO.createUser(userObj)
    }

    async getUserById(id) {
        return await  this.usersDAO.getUserById(id)
    }
}

export default UsersRepository