// Repository class for Users

class UsersRepository {
    constructor(DAO) {
        this.usersDAO = DAO
    }
    // Finds user by email
    async getUserByEmail(email) {
        return await this.usersDAO.getUserByEmail(email)
    }

    // Finds user by id
    async getUserById(id) {
        return await this.usersDAO.getUserById(id)
    }

    // Creates a user
    async createUser(userObj) {
        return await this.usersDAO.createUser(userObj)
    }

    // Updates user password by id
    async updateUserPasswordById(id, hashedPassword) {
        return await this.usersDAO.updateUserPasswordById(id, hashedPassword)
    }

     // Validates ID depending on persistence
    isIdValid(id) {
        return this.usersDAO.isIdValid(id)
    }
}

export default UsersRepository