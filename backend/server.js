const express = require('express')
const app = express()
const port = 4566

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})