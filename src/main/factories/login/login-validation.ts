import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { Validation } from '../../../presentation/protocols/validation'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '../../../presentation/helpers/validators'

export const makeLoginUpValidation = (): ValidationComposite => {
  const requireFields: string[] = ['email', 'password']
  const validations: Validation[] = []
  requireFields.forEach((field) => {
    validations.push(new RequiredFieldValidation(field))
  })
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
