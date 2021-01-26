import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import {
  ValidationComposite,
  RequiredFieldValidation,
  Validation,
  CompareFieldsValidation,
  EmailValidation
} from '../../presentation/helpers/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const requireFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
  const validations: Validation[] = []
  requireFields.forEach((field) => {
    validations.push(new RequiredFieldValidation(field))
  })
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
