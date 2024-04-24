import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Empleado = sequelize.define(
    "empleados",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.MEDIUMINT
        },
        idPersona: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            field: 'id_persona',
            references: {
                model: 'personas',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        idCargo: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            field: 'idCargo',
            references: {
                model: 'cargos',
                key: 'id',
            },
        },
        idDepartamento: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            field: 'idDepartamento',
            references: {
                model: 'departamentos',
                key: 'id',
            },
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

export { Empleado };