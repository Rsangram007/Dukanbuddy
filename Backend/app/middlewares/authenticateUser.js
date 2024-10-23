const jwt = require('jsonwebtoken')
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ error: 'token is required' })
    }
    try {
        const tokenData = jwt.verify(token, "monika")

        req.user = {
            id: tokenData.id,

        }
        next()
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

module.exports = authenticateUser 