import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Departamento = sequelize.define(
    "departamentos",
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
        descripcion: {
            type: DataTypes.STRING(40),
            field: 'descripcion',
            allowNull: false,
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


export { Departamento };