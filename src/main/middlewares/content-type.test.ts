import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../data/infra/db/mongodb/helper/mongo-helpers'

describe('Content type Middleware', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return default content type as json', async () => {
    app.get('/test_body_parser', (_req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_body_parser')
      .expect('content-type', /json/)
  })

  test('Should return xml when forced', async () => {
    app.get('/test_body_parser_xml', (_req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .get('/test_body_parser_xml')
      .expect('content-type', /xml/)
  })
})
