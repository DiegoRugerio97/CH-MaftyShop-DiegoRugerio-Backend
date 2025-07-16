// Repository class for Users

class UsersRepository {
    constructor(DAO) {
        this.usersDAO = DAO
    }
    async getUserByEmail(email) {
        return await this.usersDAO.getUserByEmail(email)
    }

    async createUser(userObj) {
        return await this.usersDAO.createUser(userObj)
    }

    async getUserById(id) {
        return await this.usersDAO.getUserById(id)
    }

    async updateUserPasswordById(id, hashedPassword) {
        return await this.usersDAO.updateUserPasswordById(id, hashedPassword)
    }
}

export default UsersRepository