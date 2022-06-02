const express = require('express')
const mongoose = require('mongoose')
const RestaurantModel = require('./models/restaurant.js')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000
//從json檔載入資料
const restaurantList = require('./restaurant.json')

// 設定連線到 mongoDB
mongoose.connect(process.env.RESTAURANT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connection!'))

//加入樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set static file & body-parser
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  RestaurantModel.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('add')
})

//未完成!!
app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  let test = []
  RestaurantModel.find()
    .lean()
    .then(restaurant => {
      test = test.concat(restaurant)
    })
    .then(() => {
      console.log(test)
      console.log('資料長度:', test.length)
    })

})

//顯示選中的restaurant詳細資料
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