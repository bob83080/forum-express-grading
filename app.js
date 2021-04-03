const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models') // 引入資料庫
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') // 設定使用 Handlebars 做為樣板引擎
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening at http://localhost:${port}`)
})

require('./routes')(app)

module.exports = app
