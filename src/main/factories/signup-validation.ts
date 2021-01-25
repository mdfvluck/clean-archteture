import { ValidationComposite } from '../../presentation/helpers/validators/validationComposite'
import { Validation } from '../../presentation/helpers/validators/validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const requireFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
  const validations: Validation[] = []
  requireFields.forEach((field) => {
    validations.push(new RequiredFieldValidation(field))
  })
  return new ValidationComposite(validations)
}
