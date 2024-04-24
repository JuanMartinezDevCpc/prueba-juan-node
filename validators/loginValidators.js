import { body, validationResult } from "express-validator"

export const loginValidator = [
    body("username").isEmail().withMessage("El campo tiene que ser tipo correo"),
    body("password").isString().isLength({ min: 3 }).not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        next()
    }
]