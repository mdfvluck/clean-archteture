import { AddAccount, AddAccountModel, AccountModel, Validation } from './signup-protocols'
import { MissingParamError, ServerError } from '../../error'
import { badRequest } from '../../helpers/http/http-helper'
import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  interface SutTypes {
    sut: SignUpController
    addAccountStub: AddAccount
    validationStub: Validation
  }

  const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null as unknown as Error
      }
    }
    return new ValidationStub()
  }

  const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccount()
    const validationStub = makeValidation()
    const sut = new SignUpController(addAccountStub, validationStub)
    return {
      sut,
      addAccountStub,
      validationStub
    }
  }

  const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
      async add (account: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password'
        }
        return new Promise(resolve => resolve(fakeAccount))
      }
    }
    return new AddAccountStub()
  }

  const mockHttpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockHttpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(mockHttpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(mockHttpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpReponse = await sut.handle(mockHttpRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
