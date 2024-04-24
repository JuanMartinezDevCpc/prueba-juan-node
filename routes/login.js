import bcrypt from 'bcrypt'
import { Router } from "express"
import { createToken } from "../components/jwt.js"
import { Service } from "../service/login.js"
import { loginValidator } from "../validators/loginValidators.js"

export function AuthenticationApi(app) {
    const router = Router()
    app.use("/api", router)
    const service = new Service()

    router.post('/login', loginValidator, async (req, res, next) => {
        try {
			const user = await service.getUserByEmail(req.body)
            if (!user) return res.status(404).json({ errors: { message: "por favor registrese" } })

            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = createToken({ email: user.correo, id: user.id }, true)
                res.send({ message: 'Loqueado correctamente', data: token })
            } else {
                res.status(400).json({ errors: { message: 'Contraseña incorrecta' } })
            }
        } catch (error) {
            next(error)
        }
    })
}