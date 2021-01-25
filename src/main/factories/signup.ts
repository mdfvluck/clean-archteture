import { AccountMongoRepository } from '../../data/infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controller/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { BcryptAdapter } from '../../data/infra/criptography/bcrypt-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountDbRepository = new AccountMongoRepository()
  const validationComposite = makeSignUpValidation()
  const dbAddAccount = new DbAddAccount(encrypterAdapter, accountDbRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount, validationComposite)
}
