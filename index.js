const express = require('express')
const cors = require('cors')
const path = require('path')
const  app = express()

app.use(express.static(path.join(__dirname, 'frontEnd/build')))

app.get('/api/tester/', cors(), async(req,res,next) => {
  try {
    res.json({testMessage:'You better be able to see this binch'})
  } catch (err) {
    next(err)
  }
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontEnd/build/index.html'))
})

const PORT = process.env.PORT || 5000

app.listen( PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
