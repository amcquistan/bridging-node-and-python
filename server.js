// server.js

const express = require('express');
const bodyParser = require('body-parser');
const pynode = require('@fridgerator/pynode');
const _ = require('lodash');

pynode.startInterpreter();
pynode.appendSysPath('./');

// needed this to find numpy
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
        reject('failed to load housing variables');
      }
  })
  .then(response => res.send(response))
  .catch(err => res.err(err));
});

app.get('/api/home-price-predict', (req, res) => {
  // const { firstName, lastName, phone } = req.body
  // TODO: create contact
});

// app.delete('/api/contacts/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   // TODO: find and delete contact by id
// });

// app.put('/api/contacts/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const { firstName, lastName, phone } = req.body
//   // TODO: find and update contact by id
// });

app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});


