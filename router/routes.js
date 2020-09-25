const express = require('express')
const cors = require('cors')
const path = require('path')
const router = express.Router();

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  router.get('/', cors(), (req, res) => {
    res.sendFile(path.join(__dirname, '../frontEnd/public/index.html'))
  })
} else {
  router.get('/', cors(), (req, res) => {
    res.sendFile(path.join(__dirname, '../frontEnd/build/index.html'))
  })
}

module.exports = router;
