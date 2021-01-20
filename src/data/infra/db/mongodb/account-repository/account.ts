import { AddAccountRepository } from '../../../../protocols/add-account-repository'
import { AddAccountModel } from '../../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../../domain/models/account'
import { MongoHelper } from '../helper/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { _id, ...account } = result.ops[0]
    return Object.assign({}, account, { id: _id })
  }
}
