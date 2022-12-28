import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    )
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Unão de firma',
      description: 'Lá maquina más veloz',
      daily_rate: 150.0,
      license_plate: 'ANA-2468',
      fine_amount: 50,
      brand: 'Fiat',
      category_id: 'Category_id_In_Memory',
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Unão de firma',
      description: 'Lá maquina más veloz',
      daily_rate: 150.0,
      license_plate: 'ANA-2468',
      fine_amount: 50,
      brand: 'Car_Brand_Test',
      category_id: 'Category_id_In_Memory',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_Brand_Test',
    })

    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Unão teste final',
      description: 'Lá maquina más veloz',
      daily_rate: 150.0,
      license_plate: 'ANA-2469',
      fine_amount: 50,
      brand: 'Car_Brand_Test',
      category_id: 'Category_id_In_Memory',
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Unão teste final',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Unão teste final',
      description: 'Lá maquina más veloz',
      daily_rate: 150.0,
      license_plate: 'ANA-2469',
      fine_amount: 50,
      brand: 'Car_Brand_Test',
      category_id: 'FindByCategoryCorrect',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'FindByCategoryCorrect',
    })

    expect(cars).toEqual([car])
  })
})
