import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specifications.routes'
import { userRoutes } from './users.routes'
import { carsRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/users', userRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalRoutes)
router.use(authenticateRoutes)

export { router }
