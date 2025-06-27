// Passport
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
// ENV
import config from '../config.js'

// Cookie extractor
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["userToken"];
    }
    return token;
}

// Extracting user from JWT given at login 
export const jwt = new JwtStrategy(
    {
        secretOrKey: config.SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    },
    (payload, done) => {
        try{
            return done(null, payload)
        }
        catch{
            return done(err)
        }
        
    },
)