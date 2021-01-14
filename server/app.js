const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// requiring and using routes
app.use('/test', require('./test'));
app.use('/users', require('./users'));
app.use('/auth', require('./auth'));
app.use('/blog', require('./admin/blog'));
app.use('/admin/reset', require('./admin/passwordReset'));
app.use('/admin/auth', require('./admin/auth'));

app.use('/course/resources', require('./course/resources'));
app.use('/course/videos', require('./course/videos'));

app.use(
  '/course',
  cors({ origin: ['http://localhost:3000', 'https://master.d3kw4pqdide09j.amplifyapp.com'], credentials: true }),
  require('./admin/course')
);

app.listen(port, () => {
  console.log(`just code`);
});
