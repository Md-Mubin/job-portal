const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    try {
        const cookies = req.headers.authorization;

        if (!cookies) return res.status(401).send({ err: "Unauthorized. No Cookies Found" })

        jwt.verify(cookies, process.env.SECRET_ACC_TOKEN, (err, decoded) => {
            if (err) return res.status(401).send({ err: "Something Went Wrong" })

            if (decoded) {
                req.user = decoded.data
                next()
            }
        })
    } catch (error) {
        return res.status(500).send({ err: "Server Error" })
    }
}

module.exports = authMiddleware