import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
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
    throw new Error('Token missing')
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
      throw new Error('User not found / exists')
    }

    next()
  } catch {
    throw new Error('Token invalid')
  }
}
