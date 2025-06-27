// Router
import { Router } from 'express'
// Passport
import passport from 'passport'
// Utils
import { generateToken } from '../util.js';

const router = Router();

// Register
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failRegister', session: false }), async (req, res) => {
    res.status(200).send({ status: 'success', message: 'User registered succesfully.' })
})

// Login
router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failLogin', session: false }), async (req, res) => {

    let {...user} = req.user
    delete user.password
    const token = generateToken(user)
    res.cookie('userToken', token, { httpOnly: true }).redirect('/products')
})

// Github login
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }), async (req, res) => { })

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login', session: false }), async (req, res) => {

    let {...user} = req.user
    delete user.password
    const token = generateToken(user)
    res.cookie('userToken', token, { httpOnly: true }).redirect('/products')
})

// User information with JWT 
router.get('/current', passport.authenticate('jwt', {failureRedirect:'/api/sessions/failLogin', session: false }),
    (req, res) => {
        res.send(req.user)
    }
)
// Logout
// Clears cookie
router.get('/logout', async (req, res) => {
    res.clearCookie('userToken')
    res.redirect("/login")
})
// Error routes
router.get('/failLogin', async (req, res) => {
    res.status(401).send({status:"ERROR",message:"Token incorrecto"})
})

router.get('/failRegister', async (req, res) => {
    res.status(409).send({ status: 'ERROR', message: 'User already exists.' })
})

export default router