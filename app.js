const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

//加入樣板引擎
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

//set static file
app.use(express.static('public'))

app.get('/',(req,res)=>{
  res.render('index')
})

app.listen(port,()=>{
  console.log(`Express is listening on localhost:${port}`)
})