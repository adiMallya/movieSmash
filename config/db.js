const mongoose = require('mongoose');

const mongoURI = process.env['MONGODB']

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`MongoDB Connected : ${conn.connection.host}`);
    }
  } catch (error) {
    console.log('Connection Failed', error);
  }
}

module.exports = connectDatabase;