// Passport
import GitHubStrategy from 'passport-github2'
// Services
import {cartsService, usersService} from "../../services/index.service.js"
import { createHash } from '../../util.js'
// ENV
import config from '../config.js'

// Github strategy
const verifyRegisterGitHub = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await usersService.getUserByEmail(profile.profileUrl)
        if (!user) {
            const response = await cartsService.createCart()
            let newUser = {
                first_name: profile.username,
                last_name: 'default',
                email: profile.profileUrl,
                age: 18,
                password: createHash(config.SECRET),
                cart: response._id
            };
            let result = await usersService.createUser(newUser)
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