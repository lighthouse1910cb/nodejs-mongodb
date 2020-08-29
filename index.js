const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const dbURI =
  'mongodb+srv://dungnguyenh5:Dung19@cb@cluster0.lhrs8.mongodb.net/Nasher?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Nasher',
  })
  .then(() => {
    console.log('connected');
    app.listen(9999);
  })
  .catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/authRoute'));

app.use('/api/dev', require('./routes/devRoute'));

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(422).send({ error: err.message });
});
