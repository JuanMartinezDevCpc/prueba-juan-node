import { sequelize } from "../database/database.js"
import { Departamento } from "../models/Departamento.js";
import { Empleado } from "../models/Empleado.js";

export class Service {
    constructor() { }

    async getDepartamentos() {
        const departamentos = await Departamento.findAll()
        return departamentos;
    }

    async postDepartamento(body) {
        return await sequelize.transaction(async (t) => {
            const { nombre, descripcion } = body

            const departamento = await Departamento.create({
                nombre, descripcion
            }, { transaction: t })

            return { data: departamento }
        })
    }

    async putDepartamento(body, id) {
        return await sequelize.transaction(async (t) => {
            const { nombre, descripcion} = body
            const departamento = await Departamento.findByPk(id);
            if (!departamento) return { status: 400, message: 'el departamento no se encuentra registrado' }

            await departamento.update({
                nombre, descripcion
            }, { transaction: t })

            return { data: true }
        })
    }

    async deleteDepartamento(id) {
        return await sequelize.transaction(async (t) => {
            const model = await Departamento.findByPk(id)
            const exits = await Empleado.findOne({where: { idDepartamento: id }})
            if(exits) return false
            if (!model) return { status: 400, message: 'el departamento no se encuentra registrado' }
            await model.destroy( { transaction: t });
            return true
        })
    }
}
