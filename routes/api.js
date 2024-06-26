import { AuthenticationApi } from "./login.js"
import { UsersApi } from "./users.js"
import { DepartamentosApi } from "./departamentos.js"
import { CargosApi } from "./cargos.js"

export function routersApi(app) {
    AuthenticationApi(app)
    DepartamentosApi(app)
    CargosApi(app)
    UsersApi(app)
}