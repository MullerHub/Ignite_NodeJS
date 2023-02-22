import { Router } from 'express'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from './middlewares/ensuseAuthenticateDeliveryman'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { CreateDeliveryController } from './modules/deliveries/useCase/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/useCase/findAllAvailable/FindAllAvailableController'
import { UpdateDeliverymanController } from './modules/deliveries/useCase/updateDeliveryman/useCases/UpdateDeliverymanController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController()

const createDeliverymanController = new CreateDeliverymanController()

const deliveryController = new CreateDeliveryController()

const findAllAvailableController = new FindAllAvailableController()

const updateDeliverymanController = new UpdateDeliverymanController()

routes.post('/client/', createClientController.handle)

routes.post('/client/authenticate', authenticateClientController.handle)

routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle,
)

routes.post('/deliveryman', createDeliverymanController.handle)

routes.post('/delivery', ensureAuthenticateClient, deliveryController.handle)

routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle,
)

routes.put(
  '/delivery/updateDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle,
)

export { routes }
