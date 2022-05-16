const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

//從json檔載入資料
const restaurantList = require('./restaurant.json')

//加入樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set static file
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => req.params.restaurant_id === restaurant.id.toString())
  // console.log(req.params.id)
  res.render('show', { restaurant })
})

//search 功能
app.get('/search', (req, res) => {
  //filter 回傳陣列
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})