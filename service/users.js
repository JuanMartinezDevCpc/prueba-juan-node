import { sequelize } from "../database/database.js"
import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import { Persona } from "../models/Persona.js";
import { Empleado } from "../models/Empleado.js";
import { literal } from "sequelize";

export class Service {
    constructor() { }

    async getUsers({ tipo, nombre }) {
        try {
            const users = await User.findAll({
                attributes: [
                    'id',
                    'email',
                    [literal('(SELECT p.nombre FROM personas AS p WHERE p.id = users.id_persona)'), 'nombre'],
                    [literal('(SELECT p.tipo FROM personas AS p WHERE p.id = users.id_persona)'), 'tipo'],
                    [literal('(SELECT p.telefono FROM personas AS p WHERE p.id = users.id_persona)'), 'telefono'],
                    [literal('(SELECT c.id FROM personas AS p INNER JOIN empleados AS e ON e.id_persona = p.id INNER JOIN cargos AS c ON c.id = e.idCargo WHERE p.id = users.id_persona)'), 'cargo'],
                    [literal('(SELECT d.id FROM personas AS p INNER JOIN empleados AS e ON e.id_persona = p.id INNER JOIN departamentos AS d ON d.id = e.idDepartamento WHERE p.id = users.id_persona)'), 'departamento'],
                ],
                where: {
                    ...(tipo ? { tipo } : {}),
                    ...(nombre ? { nombre } : {}),
                }
            })
            return users;
        } catch (error) {
            console.log(error);
        }
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
        return await sequelize.transaction(async (t) => {
            const { nombre, email, password, telefono, tipo, idCargo, idDepartamento } = body
            const user = await User.findByPk(id);
            if (!user) return { status: 400, message: 'el usuario no se encuentra registrado' }
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
        return await sequelize.transaction(async (t) => {
            const model = await User.findByPk(id)
            if (!model) return { status: 400, message: 'el usuario no se encuentra registrado' }
            await model.destroy( { transaction: t });
            return true
        })
    }
}
