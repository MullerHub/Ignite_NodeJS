import { AppError } from 'src/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase

let usersRepositoryInMemory: UsersRepositoryInMemory

let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      email: 'user@example.com',
      driver_license: '6969',
      password: '1234',
      name: 'User Test',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(result).toHaveProperty('token')
  })

  it('should be not able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexistent@example.com',
        password: 'passwordFalse',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '999',
        email: 'user@example.com',
        password: '1234',
        name: 'User Test',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'SenhaErrada/IncorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
