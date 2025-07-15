// Session Router
// Imports
import { Router } from 'express'
import passport from 'passport'
import SessionController from '../controller/session.controller.js';
// Router
const router = Router();
// Session Controller
const sessionController =  new SessionController()

// Register
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failRegister', session: false }), sessionController.register)
// Login
router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failLogin', session: false }), sessionController.login)
// Github login
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }), async (req, res) => { })
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login', session: false }), sessionController.login)
// User information with JWT 
router.get('/current', passport.authenticate('jwt', {failureRedirect:'/api/sessions/failLogin', session: false }),sessionController.current)
// Logout
// Clears cookie
router.get('/logout', sessionController.logout)
// Error routes
router.get('/failLogin', sessionController.failLogin)
router.get('/failRegister', sessionController.failRegister)

export default router