const express = require('express');
const {getAll} = require('../controllers/my-group.controller')
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

  router.get('/', getAll);


  module.exports = router