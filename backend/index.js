const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const browserObject = require('./puppeteer/browser');
const scraperController = require('./puppeteer/pageController');

const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(pino);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname)); 

app.get('/api/getBarcodeItem', (req, res) => {
  getItemByBarcode(req.query.code).then(response => res.json(response))
});

app.get('/*', function(request, response) {
  response.sendFile(path.join(__dirname, '../src', 'index.html'));
});

async function getItemByBarcode(barcode) {
  let browserInstance = browserObject.startBrowser();
  let response = await scraperController(browserInstance, barcode)
  return response;
}


app.listen(port, () => console.log(`Listening on port ${port}`));