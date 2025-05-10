import mongoose from "mongoose";

const databaseUrl = 'mongodb://localhost:27017/requestBodies?'

mongoose.set('strictQuery', false)

mongoose.connect(databaseUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log(`error connection to ${error.message}`))

  const requestBodySchema = new mongoose.Schema({
    request: Object
  })

  requestBodySchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  export default mongoose.model('requestBody', requestBodySchema)