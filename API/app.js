const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
const AuthRoute = require('./Routes/Auth');
const UserRoute = require('./Routes/Users');
const MovieRoute = require('./Routes/Movies');
const ListRoute = require('./Routes/Lists');

env.config();

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected');
  });
}

app.use(express.json());

app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoute);
app.use('/api/movies', MovieRoute);
app.use('/api/lists', ListRoute);

app.listen(5000, () => {
  console.log('Backend Server is running on 5000');
});
