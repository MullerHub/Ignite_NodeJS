import { Request, Response } from 'express'
import { prisma } from '../../../../database/prismaClient'
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase'

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request

    const findAllDeliveriesDeliverymanUseCase =
      new FindAllDeliveriesDeliverymanUseCase()

    const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(
      id_deliveryman,
    )
  }
}
