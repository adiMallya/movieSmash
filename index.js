const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssSanitize = require('xss-clean');
const connectDatabase = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');

//Connect to Db
connectDatabase();

//Routes
const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const movies = require("./routes/movies.routes");

const app = express();
//Body parser
app.use(express.json());

//Middlewares
if (process.env['NODE_ENV'] === 'development') {
  app.use(logger);
}
// Sanitize data(prevent NoSQL injections)
app.use(mongoSanitize());
// Prevent XSS attacks
app.use(xssSanitize());
// Enable CORS(Cross-Origin Resource Sharing)
app.use(cors({}));

app.use(helmet());

//Mount routes
app.get('/', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/16480324/2s9YJXaQsz')
});
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/movies', movies);
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