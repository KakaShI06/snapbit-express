const mongoose = require('mongoose')

const connectDB = async() => {
  try {
    const connection  = await mongoose.connect(process.env.NODE_MONGODB_URL)

    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch(err){
    console.error(err)
    process.exit(1)
  }
}


module.exports = connectDB