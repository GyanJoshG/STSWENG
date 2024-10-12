const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); 
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));
// Uncomment lines below when HBS files are being used
//app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'INSERT_LANDING_PAGE_NAME_HERE'})); 
//app.set('view engine', '.hbs');

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});