import { MongoHelper } from '../data/infra/db/mongodb/helper/mongo-helpers'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log('Server is running at http://localhost:5050'))
  })
  .catch(console.error)
