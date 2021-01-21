import { MongoHelper as sut } from './mongo-helpers'
describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    const accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    const accountCollection2 = sut.getCollection('accounts')
    expect(accountCollection2).toBeTruthy()
  })
})
