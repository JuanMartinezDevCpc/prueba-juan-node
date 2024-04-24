// user.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const User = sequelize.define(
    "users",
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
        email: {
            type: DataTypes.STRING(80),
            unique: true,
            allowNull: false
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(120)
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
);

export { User };