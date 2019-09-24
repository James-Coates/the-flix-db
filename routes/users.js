const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const newUser = req.body;
  if (!newUser.username) {
    return res.status(400).send('Missing name');
  }
  return res.status(201).send(newUser);
});
router.put('/:username', (req, res) => {
  const editUser = req.body;
  if (!editUser.username) {
    return res.status(400).send('Missing name');
  }
  return res.status(201).send(editUser);
});
router.post('/:username/movies/:movieId', (req, res) => {
  const editUser = req.body;
  if (!editUser.username) {
    return res.status(400).send('Missing name');
  }
  return res.status(201).send(editUser);
});
router.delete('/:username', (req, res) => {
  const editUser = req.body;
  if (!editUser.username) {
    return res.status(400).send('Missing name');
  }
  return res.status(201).send(editUser);
});

module.exports = router;
