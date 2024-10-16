import session from 'express-session';
import exphbs from 'express-handlebars';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './server/dbConnect.js';
import productsRouter from './server/api/products.js';
import customersRouter from './server/api/customers.js';
import indexRouter from './server/api/index.js';

const app = express();
const PORT = process.env.PORT;
dotenv.config();
connectDB();

// Middleware
// TODO: Move middleware to /server/middleware
app.use(express.json());
app.use(express.static('src')); // TODO: Change 'src' to 'public' when the src folder is renamed to public
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'index'})); 
app.set('view engine', '.hbs');

app.use('/', productsRouter);
app.use('/', customersRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});