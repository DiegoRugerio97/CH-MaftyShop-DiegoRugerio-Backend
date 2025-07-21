// Session Router
// Imports
import { Router } from 'express'
import SessionController from '../controller/session.controller.js'
import { jwtAuthenticationRedirect } from './middleware.js'
import passport from 'passport';
// Router
const router = Router();
// Session Controller
const sessionController =  new SessionController()

// Register
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failRegister', session: false }), sessionController.register)
// Login
router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failAuthenticated', session: false }), sessionController.login)
// Github login
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }), async (req, res) => { })
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login', session: false }), sessionController.login)
// User information with JWT 
router.get('/current', jwtAuthenticationRedirect('/api/sessions/failAuthenticated'),sessionController.current)
// Start password reset process
router.post('/forgetPassword', sessionController.forgetPassword)
// Resetting password
router.post('/resetPassword', sessionController.resetPassword)
// Logout - Clears cookie
router.get('/logout', sessionController.logout)
// Error routes
router.get('/failAuthenticated', sessionController.failAuthenticated)
router.get('/failRegister', sessionController.failRegister)

export default router