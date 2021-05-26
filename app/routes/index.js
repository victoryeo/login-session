const express = require('express')
const qr = require('./qr_routes')

const router = express.Router()

router.get('/', (req, res) => {
  console.log("root")
  res.send("root")
})

router.use('/qr', qr)

router.use('/api', require('./api'))

module.exports = router
