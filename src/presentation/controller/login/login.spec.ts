import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../error'
import { LoginController } from './login'
describe('Login Controller', () => {
  interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
  }

  const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidatorStub()
    const sut = new LoginController(emailValidatorStub)
    return {
      sut,
      emailValidatorStub
    }
  }

  const makeEmailValidatorStub = (): EmailValidator => {
    class MakeEmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        return true
      }
    }
    return new MakeEmailValidatorStub()
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

  test('Should call emailValidator with corrects values', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 400 if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'any_password'
      }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
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
