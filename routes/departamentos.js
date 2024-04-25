import { Router } from "express"
import { verifyAccessTokenMiddleware } from "../components/jwt.js"
import { Service } from "../service/departamentos.js"

export function DepartamentosApi(app) {
	const router = Router();
	const service = new Service();
	app.use('/api', router)

	router.get('/departamentos', async (req, res, next) => {
		try {
			const users = await service.getDepartamentos(req.query)
			res.send({ message: 'Consultado correctamente', data: users })
		} catch (error) {
			next(error)
		}
	})

	router.post('/departamento', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const { body } = req;
			const user = await service.postDepartamento(body)
			res.send({ message: 'creado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	})

	router.put('/user/:idDepartamento/editar', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const { body } = req;
			const idDepartamento = req.params.idDepartamento
			const user = await service.putDepartamento(body, idDepartamento)
			res.send({ message: 'creado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	} )

	router.delete('/productos/:idDepartamento/eliminar', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const idDepartamento = req.params.idDepartamento
			const user = await service.deleteDepartamento(idDepartamento)
			res.send({ message: 'eliminado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	} )
}