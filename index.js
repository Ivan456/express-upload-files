const express = require('express')
const app = express()
const cors = require('cors')
const { router } = require('./src/controllers')
const { connect } = require('./src/repository')

app.use(cors())
app.use(express.json())
app.use(router)

connect(() => {
  app.listen(8888)
})
