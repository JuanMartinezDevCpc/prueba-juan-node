import { Router } from "express"
import { verifyAccessTokenMiddleware } from "../components/jwt.js"
import { Service } from "../service/cargos.js"

export function CargosApi(app) {
	const router = Router();
	const service = new Service();
	app.use('/api', router)

	router.get('/cargos', async (req, res, next) => {
		try {
			const users = await service.getCargo(req.query)
			res.send({ message: 'Consultado correctamente', data: users })
		} catch (error) {
			next(error)
		}
	})

	router.post('/cargo', verifyAccessTokenMiddleware,async (req, res, next) => {
		try {
			const { body } = req;
			const user = await service.postCargo(body)
			res.send({ message: 'creado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	})

	router.put('/user/:idCargo/editar', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const { body } = req;
			const idCargo = req.params.idCargo
			const user = await service.putCargo(body, idCargo)
			res.send({ message: 'creado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	} )

	router.delete('/cargos/:idCargo/eliminar', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const idCargo = req.params.idCargo
			const user = await service.deleteCargo(idCargo)
			res.send({ message: 'eliminado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	} )
}