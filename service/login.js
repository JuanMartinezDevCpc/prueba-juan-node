import { User } from "../models/User.js"

export class Service {
    constructor() { }

    async getUserByEmail({ username }) {
        const result = await User.findOne({
            where: {
                correo: username
            }
        })
        return result
    }
}