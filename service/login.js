import { User } from "../models/User.js"

export class Service {
    constructor() { }

    async getUserByEmail(email) {
        const result = await User.findOne({
            where: {
                email
            }
        })
        return result
    }
}