import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.user

    // Receber arquivo / avatar
    const avatar_file = request.file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    })
  }
}

export { UpdateUserAvatarController }
