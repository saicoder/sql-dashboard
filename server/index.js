const fs = require('fs')
const express = require('express')
const dbConnector = require('./db_connector')

// ==================== CONFIG ==================
let __config = null
const getConfig = () => {
  if (__config) return __config
  
  const data = fs.readFileSync('./config.json', { encoding: 'utf8' })
  const config = JSON.parse(data)
  
  if (process.env.NODE_ENV == 'production') __config = config

  return config
}

// ==================== SEVER ==================
const app = express()

app.use(express.static('client/build'))

app.get('/api/widgets', (_, res) => res.json(getConfig().widgets))

app.get('/api/widgets/:index/exec', (req, res) => {
  const index = parseInt(req.params.index, 10)
  const widget = getConfig().widgets[index]
  
  if (!widget) return res.json({ error: 'Invalid widget' })
  
  dbConnector.exec(widget.query)
    .then((results) => res.json({ error: null, results: results }))
    .catch((error) => res.json({ error: error.toString() }))
})

dbConnector.init(getConfig()).then(() => {
  const PORT = parseInt(process.env.PORT, 10) || 3001
  app.listen(PORT, () => console.log(`SQL Dashboard is running on http://0.0.0.0:${PORT}/`))
}).catch(console.error.bind(null, "Can't connect to database:"))

