import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET : process.env.SECRET,
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,
    PERSISTENCE: process.env.PERSISTENCE,
    ORIGIN_MAIL: process.env.ORIGIN_MAIL,
    ORIGIN_PASS : process.env.ORIGIN_PASS
}