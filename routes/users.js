import { Router } from "express"
import { verifyAccessTokenMiddleware } from "../components/jwt.js"
import { Service } from "../service/users.js"

export function UsersApi(app) {
	const router = Router();
	const service = new Service();
	app.use('/api', router)

	router.get('/users', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const users = await service.getUsers(req.query)
			res.send({ message: 'Consultado correctamente', data: users })
		} catch (error) {
			next(error)
		}
	})

	router.post('/user' , verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const { body } = req;
			const user = await service.postUser(body)
			res.send({ message: 'creado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	})

	router.put('/user/:idUser/editar', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const { body } = req;
			const idUser = req.params.idUser
			const user = await service.putUser(body, idUser)
			res.send({ message: 'creado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	} )

	router.delete('/productos/:idUser/eliminar', verifyAccessTokenMiddleware, async (req, res, next) => {
		try {
			const idUser = req.params.idUser
			const user = await service.deleteUser(idUser)
			res.send({ message: 'eliminado correctamente', data: user })
		} catch (error) {
			next(error)
		}
	} )
}