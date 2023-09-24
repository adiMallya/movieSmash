const fs = require('fs');
const mongoose = require('mongoose');
const connectDatabase = require('./config/db');

const Movie = require('./models/movies.model');
const User = require('./models/users.model');

//Connect to DB
connectDatabase();

//Read data from files
const userData = JSON.parse(fs.readFileSync('./_data/users.json', 'utf-8'));
const movieData = JSON.parse(fs.readFileSync('./_data/movies.json', 'utf-8'));

//Import data
const importData = async () => {
  try {
    await User.create(userData);
    await Movie.create(movieData);

    console.log('Data imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect()
  }
}
//Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Movie.deleteMany();

    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect()
  }
}

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}