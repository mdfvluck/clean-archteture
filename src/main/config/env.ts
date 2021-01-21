export default {
  mongoUrl: process.env.MONGO_URL as string || 'mongodb://localhost:27017/clean-node-api',
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  port: process.env.PORT || 5050
}
