import { HttpRequest, HttpResponse, Authentication } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { MissingParamError } from '../../error'
import { Validation } from '../../helpers/validators'
import { LoginController } from './login'
describe('Login Controller', () => {
  interface SutTypes {
    sut: LoginController
    authenticationStub: Authentication
    validationStub: Validation
  }

  const makeSut = (): SutTypes => {
    const authenticationStub = makeAuthentication()
    const validationStub = makeValidation()
    const sut = new LoginController(authenticationStub, validationStub)
    return {
      sut,
      authenticationStub,
      validationStub
    }
  }

  const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
      async auth (_email: string, _password: string): Promise<string> {
        return new Promise((resolve, reject) => resolve('any_token'))
      }
    }
    return new AuthenticationStub()
  }

  const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
      validate (_input: any): Error {
        return null as unknown as Error
      }
    }
    return new ValidationStub()
  }

  const makeHttpRequest = (): HttpRequest => {
    return {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
  }

  test('Should call Authentication with corrects values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeHttpRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@email.com', 'any_password')
  })

  test('Should return 401 if Authentication return a badRequest', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve) => resolve('')))
    const httpResponse: HttpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse: HttpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 with a tokenAccess', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest: HttpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpReponse = await sut.handle(makeHttpRequest())
    expect(httpReponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
