import { AddAccountRepository } from '../../../../protocols/add-account-repository'
import { AddAccountModel } from '../../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../../domain/models/account'
import { MongoHelper } from '../helper/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
