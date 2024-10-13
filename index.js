const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

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
// TODO: Uncomment lines below when HBS files are being used
//app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'INSERT_LANDING_PAGE_NAME_HERE'})); 
//app.set('view engine', '.hbs');

// Routes
// TODO: Move routes to /routes
// TODO: Edit routes when HBS is being used
app.get('/', (req, res) => {
  res.sendFile('./src/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});