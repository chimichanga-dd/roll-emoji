const express = require('express')
const cors = require('cors')
const path = require('path')
const router = express.Router();
const { isUsedName } = require("../apiSocket/socketContainer")


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  router.get('/', cors(), (req, res) => {
    return res.sendFile(path.join(__dirname, '../frontEnd/public/index.html'))
  })
} else {
  router.get('/', cors(), (req, res) => {
    return res.sendFile(path.join(__dirname, '../frontEnd/build/index.html'))
  })
}

router.post('/username', cors(), (req, res) => {
  const userName = req.body.userName
  if (isUsedName(userName)){
    let a = res.status(406).send({ message: 'That name is already in use'})
    return a
  }
  return res.send(userName)
})

module.exports = router;
