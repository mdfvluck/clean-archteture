import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginUpValidation } from './login-validation'
import { Validation } from '../../../presentation/protocols/validation'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('Login Validation', () => {
  const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
      isValid (_email: string): boolean {
        return true
      }
    }
    return new EmailValidatorStub()
  }

  test('Should call validationComposite with all validations', () => {
    makeLoginUpValidation()
    const requireFields: string[] = ['email', 'password']
    const validations: Validation[] = []
    requireFields.forEach((field) => {
      validations.push(new RequiredFieldValidation(field))
    })
    const emailValidator = makeEmailValidator()
    validations.push(new EmailValidation('email', emailValidator))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
