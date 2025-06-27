// Passport
import GitHubStrategy from 'passport-github2'
// Models
import userModel from '../../DAOs/Models/user.model.js'
import cartModel from '../../DAOs/Models/cart.model.js'
import { createHash } from '../../util.js'
// ENV
import config from '../config.js'

// Github strategy
const verifyRegisterGitHub = async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ email: profile.profileUrl }).lean().exec()
        if (!user) {
            const response = await cartModel.create({})
            let newUser = {
                first_name: profile.username,
                last_name: 'default',
                email: profile.profileUrl,
                age: 18,
                password: createHash(config.SECRET),
                cart: response._id
            };
            let result = await userModel.create(newUser);
            done(null, result);
        }
        else {
            done(null, user);
        }
    }
    catch (error) {
        return done('Error creating user: ' + error)
    }
}

export const registerGitHub = new GitHubStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
}, verifyRegisterGitHub)