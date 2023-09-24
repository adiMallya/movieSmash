const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');

//Connect to Db
connectDatabase();

//Routes

const app = express();
//Body parser
app.use(express.json());

//Middlewares
app.use(cors({}));
app.use(helmet())

//Mount routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Movie Smash</h1>')
});

//Error Handling
app.use(errorHandler);

const PORT = process.env['PORT'] || 2000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env['NODE_ENV']} mode
    on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error : ${err.message}`);

  server.close(() => process.exit(1));
})