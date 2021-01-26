import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { Validation } from '../../../presentation/protocols/validation'
import { makeSignUpValidation } from './signup-validation'
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation
} from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('SignUp Validation', () => {
  const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
      isValid (_email: string): boolean {
        return true
      }
    }
    return new EmailValidatorStub()
  }

  test('Should call validationComposite with all validations', () => {
    makeSignUpValidation()
    const requireFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    const validations: Validation[] = []
    requireFields.forEach((field) => {
      validations.push(new RequiredFieldValidation(field))
    })
    const emailValidator = makeEmailValidator()
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', emailValidator))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
