const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/abi.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'abi.json'));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('✅ Frontend running at http://localhost:3000');
});
