import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'
import { EmailValidator } from '../../presentation/protocols/email-validator'

jest.mock('../../presentation/helpers/validators/validationComposite')

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
