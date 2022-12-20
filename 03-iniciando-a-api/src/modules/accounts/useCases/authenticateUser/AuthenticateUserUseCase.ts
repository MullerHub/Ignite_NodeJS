import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('USerRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest) {
    // Usuario existe
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário ou senha não encontrados')
    }

    const passwordMatch = await compare(password, user.password)
    // Senha está correta
    if (!passwordMatch) {
      throw new AppError('Senha incorreta')
    }

    // Gerar jsonwebtoken
    const token = sign(
      {},
      'NecessitaCriptografiaNesseExemploUsadoNaAuthenticateEnoMiddleware',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    )

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
