import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<void> {
    // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id,
    )

    if (!carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    //Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id,
    )

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!")
    }

    // O aluguel deve ter duração minima de 24 horas
  }
}

export { CreateRentalUseCase }
