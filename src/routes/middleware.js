// Authorization middleware
// Imports

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