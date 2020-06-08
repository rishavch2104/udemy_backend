//ERROR HANDLING FOR UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  err.printStackTrace && err.printStackTrace();
  process.exit(1);
});

const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { adminInit } = require('./middleware/firebaseAdmin');
dotenv.config({ path: './config.env' });

adminInit();
mongoose.connect('mongodb://localhost/udemy_backend', {
  useNewUrlParser: true,
});
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected', () => {
  console.log('connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`connected on port ${process.env.PORT}`);
});

//ERROR HANDLING FOR UNHANDLED REJECTION
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  err.printStackTrace && err.printStackTrace();
  server.close(() => {
    process.exit(1);
  });
});
