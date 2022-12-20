import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated) // ensure de exemplo, excluir em produção

specificationRoutes.post('/', createSpecificationController.handle)

export { specificationRoutes }
