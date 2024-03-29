import 'reflect-metadata'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'newCategory',
      description: 'category description test',
    }
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    )

    console.log(categoryCreated)
    expect(categoryCreated).toHaveProperty('id')
  })

  it('should be able to create a new category with same name', async () => {
    expect(async () => {
      const category = {
        name: 'newCategory',
        description: 'category description test',
      }
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
