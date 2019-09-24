const express = require('express');
const path = require('path');

const appRoot = path.dirname(require.main.filename);
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the Homepage');
});

router.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: `${appRoot}/public` });
});

module.exports = router;
