import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated) // ensure de exemplo, excluir em produção

specificationRoutes.post('/', createSpecificationController.handle)

export { specificationRoutes }
