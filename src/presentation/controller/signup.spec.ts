import { SignUpController } from './signup'
import { MissingParamError } from '../error/missing-params-error'

const makeSut = (): SignUpController => {
  return new SignUpController()
}
describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no passwaord is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        // password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
        // passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})
