import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'name',
      category_id: 'category_id',
      description: 'description',
      brand: 'brand',
      daily_rate: 24,
      fine_amount: 1500,
      license_plate: 'license_plate',
    })
  })
})
