const mongoose = require('mongoose')
const RestaurantModel = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')

mongoose.connect(process.env.RESTAURANT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => {
  const restaurantData = restaurantList.results
  console.log('mongodb connection!')

  for (let i = 0; i < restaurantData.length; i++) {
    RestaurantModel.create({
      id: restaurantData[i].id,
      name: restaurantData[i].name,
      name_en: restaurantData[i].name_en,
      category: restaurantData[i].category,
      image: restaurantData[i].image,
      location: restaurantData[i].location,
      phone: restaurantData[i].phone,
      google_map: restaurantData[i].google_map,
      rating: restaurantData[i].rating,
      description: restaurantData[i].description
    })
  }

  console.log('Data load to mongo completed')
})
