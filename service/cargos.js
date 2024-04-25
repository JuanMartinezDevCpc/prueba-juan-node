import { sequelize } from "../database/database.js"
import { Cargo } from "../models/Cargo.js";
import { Empleado } from "../models/Empleado.js";

export class Service {
    constructor() { }

    async getCargo() {
        const cargos = await Cargo.findAll()
        return cargos;
    }

    async postCargo(body) {
        return await sequelize.transaction(async (t) => {
            const { nombre, descripcion } = body

            const cargo = await Cargo.create({
                nombre, descripcion
            }, { transaction: t })

            return { data: cargo }
        })
    }

    async putCargo(body, id) {
        return await sequelize.transaction(async (t) => {
            const { nombre, descripcion } = body
            const cargo = await Cargo.findByPk(id);
            if (!cargo) return { status: 400, message: 'el cargo no se encuentra registrado' }

            await cargo.update({
                nombre, descripcion
            }, { transaction: t })

            return { data: true }
        })
    }

    async deleteCargo(id) {
        return await sequelize.transaction(async (t) => {
            const model = await Cargo.findByPk(id)
            const exits = await Empleado.findOne({where: { idCargo: id }})
            if(exits) return false
            if (!model) return { status: 400, message: 'el cargo no se encuentra registrado' }
            await model.destroy({ transaction: t });
            return true
        })
    }
}
