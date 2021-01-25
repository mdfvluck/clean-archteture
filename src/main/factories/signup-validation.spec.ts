import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'

jest.mock('../../presentation/helpers/validators/validationComposite')

describe('SignUp Validation', () => {
  test('Should call validationComposite with all validations', () => {
    makeSignUpValidation()
    const requireFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    const validations: Validation[] = []
    requireFields.forEach((field) => {
      validations.push(new RequiredFieldValidation(field))
    })
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
