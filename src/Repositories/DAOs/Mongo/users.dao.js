// Repository class for Users
// Imports
import userModel from "./Models/user.model.js"
// Imports
import mongoose from "mongoose"
class UsersDAO {
    async getUserByEmail(email) {
        try {
            return await userModel.findOne({ email: email }).lean().exec()
        } catch {
            console.log({ error })
            return null
        }
    }

    async createUser(userObj) {
        try {
            return await userModel.create(userObj)
        } catch {
            console.log({ error })
            return null
        }
    }

    async getUserById(id) {
        try {
            return await userModel.findById(id)
        } catch {
            console.log({ error })
            return null
        }
    }

    async updateUserPasswordById(id, hashedPassword) {
        try {
            return await userModel.findByIdAndUpdate(id, { password: hashedPassword })
        } catch {
            console.log({ error })
            return null
        }
    }

    async isIdValid(id) {
        return mongoose.Types.ObjectId.isValid(id)
    }
}

export default UsersDAO