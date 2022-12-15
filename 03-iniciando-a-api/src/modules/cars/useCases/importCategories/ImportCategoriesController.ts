import { Request, Response } from 'express'
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'
import { container } from 'tsyringe'

class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase)
    const { file } = request

    await importCategoriesUseCase.execute(file)

    return response.status(201).send()
  }
}

export { ImportCategoriesController }
