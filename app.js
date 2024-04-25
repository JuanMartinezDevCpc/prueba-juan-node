import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import { routersApi } from './routes/api.js'
import { errorHandler, logErrors, wrapErrors } from './middlewares/errorHandler.js'
// import { validateRoutes } from './middlewares/validateRoutes.js'
import { Persona } from './models/Persona.js'
import { User } from './models/User.js'
import { Departamento } from './models/Departamento.js'
import { Cargo } from './models/Cargo.js'
import { Empleado } from './models/Empleado.js'
import { Contrato } from './models/Contrato.js'


const app = express()

/* Middlewares */
app.use(cors());
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)
// app.use(validateRoutes)

routersApi(app)

export default app