import mongoose from "mongoose";

const databaseUrl = 'mongodb://localhost:27017/requestBodies?'

mongoose.set('strictQuery', false)

mongoose.connect(databaseUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log(`error connection to ${error.message}`))

  const requestBodySchema = new mongoose.Schema({
    request: Object
  })

  export default mongoose.model('requestBody', requestBodySchema)