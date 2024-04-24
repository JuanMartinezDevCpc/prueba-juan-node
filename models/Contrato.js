import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Contrato = sequelize.define(
    "contratos",
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
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fechaInicio'
        },
        fechaFin: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fechaFin'
        },
        idResponsable: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            field: 'id_Responsable',
            references: {
                model: 'empleados',
                key: 'id',
            },
            onDelete: 'CASCADE',
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

export { Contrato };