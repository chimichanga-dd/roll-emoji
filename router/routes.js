const express = require('express')
const cors = require('cors')
const path = require('path')
const router = express.Router();

router.get('/api/tester/', cors(), async(req,res,next) => {
  try {
    res.json({testMessage:'You better be able to see this binch'})
  } catch (err) {
    next(err)
  }
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontEnd/build/index.html'))
})

module.exports = router;
