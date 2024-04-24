import { sequelize } from "../database/database.js"
import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import { Persona } from "../models/Persona.js";
import { Empleado } from "../models/Empleado.js";

export class Service {
    constructor() { }

    async getUsers({ tipo, nombre }) {
        const users = await User.findAll({
            where: {
                ...(tipo ? { tipo } : {}),
                ...(nombre ? { nombre } : {}),
            }
        })
        return users;
    }

    async postUser(body) {
        return await sequelize.transaction(async (t) => {
            const { nombre, email, password, telefono, tipo, idCargo, idDepartamento } = body

            const person = await Persona.create({ nombre, telefono, tipo }, { transaction: t })
            const model = await User.create({
                email,
                password: bcrypt.hashSync(password, 10),
                idPersona: person?.id,
            }, { transaction: t });

            if (tipo == 2) return { data: model }

            await Empleado.create({
                idPersona: person?.id,
                idCargo,
                idDepartamento,
            }, { transaction: t })


            return { data: true }
        })
    }

    async putUser(body, id) {
        return await sequelize().transaction(async (t) => {
            const { nombre, email, password, telefono, tipo, idCargo, idDepartamento } = body
            const user = await User.findByPk(id);
            if (!user) return { status: 400, message: 'el producto no se encuentra registrado' }
            const person = Persona.findByPk(user?.idPersona);
            const empleadoData = Empleado.findByPk(user?.idPersona);

            await user.update({
                email,
                password: password ? bcrypt.hashSync(password, 10) : user.password,
            }, { transaction: t })
            await person.update({
                nombre, telefono, tipo, idCargo, idDepartamento
            }, {transaction: t});
            await empleadoData.update({
                idCargo,
                idDepartamento,
            }, {transaction: t})

            return { data: true }
        })
    }

    async deleteUser(id) {
        return await sequelize().transaction(async (t) => {
            const model = await User.findByPk(id)
            if (!model) return { status: 400, message: 'el usuario no se encuentra registrado' }
            await model.destroy( { transaction: t });
            return true
        })
    }
}
