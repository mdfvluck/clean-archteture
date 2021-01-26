import { EmailValidation } from '../../helpers/validators/email-validation'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamError } from '../../error'

describe('Email Validation', () => {
  const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        return true
      }
    }
    return new EmailValidatorStub()
  }

  interface SutTypes {
    sut: EmailValidation
    emailValidatorStub: EmailValidator
  }

  const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new EmailValidation('email', emailValidatorStub)
    return {
      sut,
      emailValidatorStub
    }
  }

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httResponse = sut.validate({ email: 'invalid_email@email.com' })
    expect(httResponse).toEqual(new InvalidParamError('email'))
  })

  // test('Should return 500 if emailValidator throws', () => {
  //   const { sut, emailValidatorStub } = makeSut()
  //   jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
  //     throw new Error()
  //   })
  //   const httpResponse = sut.validate({ email: 'any_email' })
  //   expect(httpResponse).toThrow()
  // })
})
