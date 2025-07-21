// Authorization middleware
// Imports
import passport from "passport"

export const authorize = authPolicies => (req, res, next) => {
    if (authPolicies[0] === "USER") {
        return next()
    }
    const user = req.user.payload
    const isAuthorized = authPolicies.includes(user.role)
    if (!isAuthorized) {
        return res.status(403).send({ status: "ERROR", message: "Unauthorized operation" })
    }
    next()
}

export const authorizeCart = () => (req, res, next) => {
    const user = req.user.payload
    const cartId = user.cartId
    const visitedCart = req.params.cId
    if (cartId !== visitedCart) {
        return res.status(403).send({ status: "ERROR", message: "Unauthorized operation" })
    }
    next()
}

export const jwtAuthenticationRedirect = (failureRedirect) => passport.authenticate('jwt', {failureRedirect:failureRedirect, session:false})
export const jwtAuthentication = () => passport.authenticate('jwt', {session:false})