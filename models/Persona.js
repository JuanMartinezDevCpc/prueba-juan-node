import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Persona = sequelize.define(
    "personas",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.MEDIUMINT
        },
        nombre: {
            type: DataTypes.STRING(40),
            field: 'nombre',
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING(11),
            allowNull: false,
            field: 'telefono'
        },
        tipo: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: 'tipo',
            allowNull: false,
            comment: "1=empleado, 2=usuario"
        },
        createdBy: {
            allowNull: true,
            type: DataTypes.MEDIUMINT
        },
        updatedBy: {
            allowNull: true,
            type: DataTypes.MEDIUMINT
        },
        createdAt: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE
        },
    }
)

export { Persona };