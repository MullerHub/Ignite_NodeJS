import { Request, Response } from 'express'
import { CreateClientUseCase } from './CreateClientUseCase'

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const createClientUseCase = new CreateClientUseCase()

    const { username, password } = request.body
    const result = await createClientUseCase.execute({
      username,
      password,
    })

    return response.json(result)
  }
}
