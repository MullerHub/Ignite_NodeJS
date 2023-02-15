import { Request, Response } from 'express'
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase'


export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createDeliveryUseCase =new CreateDeliveryUseCase()

    
    const result = await .execute({
      username,
      password,
    })

    return response.json(result)
  }
}
