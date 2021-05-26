const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./auth');

const router = express.Router()

router.get("/qrtest", auth.required, function(req, res){
    console.log("qrtest")
    res.send("qrtest")
  })

router.get("/:serialno", function(req, res){
    console.log(req.params.serialno)
    res.send("serialno")
  })

module.exports = router
