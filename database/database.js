// database.js
import { Sequelize } from "sequelize";
import { config } from "../config/config.js";

const sequelizeConfig = {
    database: config.db_name,
    username: config.db_user,
    password: config.db_password,
    host: config.db_host,
    dialect: 'mysql'
};

const sequelize = new Sequelize(sequelizeConfig);

export { sequelize };