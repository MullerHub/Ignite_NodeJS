import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name',
      category_id: 'category_id',
      description: 'description',
      brand: 'brand',
      daily_rate: 24,
      fine_amount: 1500,
      license_plate: 'license_plate',
    })
    expect(car).toHaveProperty('id')
  })

  it('should be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        category_id: 'category_id',
        description: 'description',
        brand: 'brand',
        daily_rate: 24,
        fine_amount: 1500,
        license_plate: 'license_plate',
      })

      await createCarUseCase.execute({
        name: 'Car2',
        category_id: 'category_id',
        description: 'description',
        brand: 'brand',
        daily_rate: 24,
        fine_amount: 1500,
        license_plate: 'license_plate',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'description of car',
      daily_rate: 24,
      license_plate: 'GAY-6969',
      fine_amount: 1500,
      brand: 'brand',
      category_id: 'category_id',
    })
    expect(car.available).toBe(true)
  })
})
