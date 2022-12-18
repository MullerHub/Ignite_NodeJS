import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository '

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split('')

  try {
    const { sub: user_id } = verify(
      token,
      'NecessitaCriptografiaNesseExemploUsadoNaAuthenticateEnoMiddleware',
    ) as IPayload
    console.log(user_id) // depois de testado pode excluir a const sub e interface IPayload e deixar o verify direto

    const usersRepository = new UsersRepository()
    const user = usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found / exists', 401)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Token invalid', 401)
  }
}
