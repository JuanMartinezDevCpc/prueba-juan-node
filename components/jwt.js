import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import boom from "@hapi/boom"

const invalidTokens = new Set()

function createToken(payload, refresh = false) {
    const accessToken = jwt.sign(payload, config.secret, {
        expiresIn: 30 * 60 * 60
    })

    return {
        access_token: accessToken,
        refresh_token: refresh
            ? jwt.sign(payload, config.secret, {
                expiresIn: 30 * 24 * 60 * 60
            })
            : null
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, config.secret)
        return decoded
    } catch (e) {
        return false
    }
}

function verifyAccessToken(req, res, next) {
    const headers = req.headers
    if (!headers['authorization']) {
        res.status(401).json({ message: "token not provided" })
    }

    const token = headers['authorization'].split(" ")[1]

    if (!verifyToken(token)) {
        res.status(405).json({ message: "invalid token" })
    } else {
        req.token = token
        next()
    }
}

const verifyAccessTokenMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw boom.unauthorized('Token no proporcionado')

        const token = authorization.split(' ')[1]

        if (invalidTokens.has(token)) throw boom.unauthorized('Token inválido')

        if (!verifyToken(token)) throw boom.unauthorized('Token inválido')

        req.token = token
        next()
    } catch (error) {
        next(error)
    }
}

export { createToken, verifyToken, verifyAccessToken, verifyAccessTokenMiddleware }