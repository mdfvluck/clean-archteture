import { HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../error'
import { LoginController } from './login'
describe('Login Controller', () => {
  interface SutTypes {
    sut: LoginController
  }

  const makeSut = (): SutTypes => {
    const sut = new LoginController()
    return {
      sut
    }
  }
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpReponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpReponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('password')))
  })

  // test('Should be called with correct values', () => {
  //   const { sut, loginStub } = new LoginController()
  //   const loginSpy = jest.spyOn(loginStub, 'login')
  //   const httpRequest: HttpRequest = {
  //     body: {
  //       email: 'any_email@email.com',
  //       password: 'any_password'
  //     }
  //   }
  //   sut.login(httpRequest)
  //   expect(loginSpy).toHaveBeenCalledWith(httpRequest.body)
  // })
})
