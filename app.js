const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  console.log(`Rendering 'pages/index' for route '/'`);
  res.render('pages/index');
});

module.exports = app;
