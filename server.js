// server.js

const express = require('express');
const bodyParser = require('body-parser');
const pynode = require('@fridgerator/pynode');
const _ = require('lodash');

pynode.startInterpreter();
pynode.appendSysPath('./');

// needed this so the Python interpreter can find numpy and sklearn package 
// imported at the top of housing_analyzer.py module
pynode.appendSysPath('./venv/lib/python3.6/site-packages');
pynode.openFile('housing_analyzer');

const app = express();
let regressionModel = {};

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/api/house-price-model', (req, res) => {
  new Promise((resolve, reject) => {
      try {
        if (_.isEmpty(regressionModel)) {
          console.log('calling python');
          regressionModel = pynode.call('build_regression_model');
        }
        resolve(regressionModel);
      } catch(err) {
        console.log(err);
        reject('failed to load housing variables');
      }
  })
  .then(response => res.send(response))
  .catch(err => res.err(err));
});

app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});


