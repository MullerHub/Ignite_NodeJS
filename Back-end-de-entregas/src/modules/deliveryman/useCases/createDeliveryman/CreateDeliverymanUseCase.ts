import { hash } from 'bcrypt'
import { prisma } from '../../../../database/prismaClient'

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliveryMan.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    })

    if (deliverymanExists) {
      throw new Error(`Deliveryman ${username} already exists`)
    }

    const hashPassword = await hash(password, 10)

    const deliveryman = await prisma.deliveryMan.create({
      data: {
        username,
        password: hashPassword,
      },
    })
    return deliveryman
  }
}
