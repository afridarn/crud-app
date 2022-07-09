const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/img", express.static('img'))

app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: true,
  resave: false
}));

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//set template engine
app.set("view engine", "ejs");


const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database"));

app.use("", require('./routes/routes'))

app.listen(PORT, () => {
  console.log('Server started at port 5000');
})