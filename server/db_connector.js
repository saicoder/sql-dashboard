const mysql = require('mysql')


let conn = null
let dbProv = null

// ==================== MYSQL ==========================
const initMysql = (dbConfig) => new Promise((resolve, reject) => {
  conn = require('mysql').createConnection(dbConfig)
  dbProv = 'mysql'
  
  conn.connect((err) => {
    if (err) reject(err)
    else resolve()
  })
})

const execMysql = (sql) => new Promise((resolve, reject) => {
  conn.query(sql, (err, results) => {
    if (err) reject(err)
    else resolve(results)
  })
})


// ==================== INTERFACE ======================
const init = (config) => {
  if (config.database == 'mysql') return initMysql(config.dbConfig)
  throw new Error(`Invalid database ${config.database}`)
}

const exec = (sql) => {
  if (dbProv == 'mysql') return execMysql(sql)
  throw new Error(`Invalid provider ${dbProv}`)
}

module.exports = { init, exec }
