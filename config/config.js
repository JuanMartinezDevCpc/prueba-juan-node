import dotenv from 'dotenv'

dotenv.config()

export const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_DATABASE,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    secret: process.env.SECRET
}