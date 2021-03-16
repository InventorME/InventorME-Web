const express = require('express');
const bodyParser = require('body-parser');
const requestRepository = require('./repository/requestRepository');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getBarcodeItem', (req, res) => {
  requestRepository.getItemByBarcode(req.query.code).then(result => { res.json(result)}); 
});

app.get('/api/items', (req, res) => {
  res.send(requestRepository.items);
});

app.get('/api/user', (req, res) => {
  res.json(requestRepository.user);
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));