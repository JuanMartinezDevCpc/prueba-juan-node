import { sequelize } from "../database/database.js"
import { Contrato } from "../models/Contrato.js";

export class Service {
    constructor() { }

    async getContratos() {
        const contratos = await Contrato.findAll()
        return contratos;
    }

    async postContratos(body) {
        return await sequelize.transaction(async (t) => {
            const { nombre, descripcion, fechaInicio, fechaFin, idResponsable } = body

            const contrato = await Contrato.create({
                nombre, descripcion, fechaInicio, fechaFin, idResponsable
            }, { transaction: t })

            return { data: contrato }
        })
    }

    async putContratos(body, id) {
        return await sequelize().transaction(async (t) => {
            const { nombre, descripcion, fechaInicio, fechaFin, idResponsable} = body
            const contrato = await Contrato.findByPk(id);
            if (!contrato) return { status: 400, message: 'el contrato no se encuentra registrado' }

            await contrato.update({
                nombre, descripcion, fechaInicio, fechaFin, idResponsable
            }, { transaction: t })

            return { data: true }
        })
    }

    async deleteContrato(id) {
        return await sequelize().transaction(async (t) => {
            const model = await Contrato.findByPk(id)
            if (!model) return { status: 400, message: 'el contrato no se encuentra registrado' }
            await model.destroy( { transaction: t });
            return true
        })
    }
}
