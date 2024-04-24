import app from "./app.js"
import { sequelize } from "./database/database.js"
import { config } from "./config/config.js"

async function main() {
    try {
        // await sequelize.sync({ force: false })
        //app.listen(config.port, () => {
        //    console.log("Server on port: " + config.port)
        //})
        //const sequelizeInstance = sequelize();
        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database synced');
                app.listen(config.port, () => {
                    console.log(`listening at http://localhost:${config.port}`);
                });
            })
            .catch(err => {
                console.error('Error syncing database:', err);
            });

    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

main()