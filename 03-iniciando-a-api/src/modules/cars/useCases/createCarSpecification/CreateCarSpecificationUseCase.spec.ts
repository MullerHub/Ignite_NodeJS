import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
    )
  })

  it('Should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '1234'
      const specification_id = ['54321']

      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to add a new car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name',
      category_id: 'category_id',
      description: 'description',
      brand: 'brand',
      daily_rate: 24,
      fine_amount: 1500,
      license_plate: 'license_plate',
    })
    const specification_id = ['54321']
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    })
  })
})
