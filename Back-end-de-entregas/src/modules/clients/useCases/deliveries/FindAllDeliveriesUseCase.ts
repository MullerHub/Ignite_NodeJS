import { prisma } from '../../../../database/prismaClient'

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        id: id_client,
      },
      include: {
        deliveries: true,
      },
    })

    return deliveries
  }
}
