
const db = require('../models')
const Category = db.Category
const Restaurant = db.Restaurant



const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => {
        callback({ restaurants: restaurants })
        //   console.log(restaurants) // 加入 console 觀察資料的變化
        //   return res.json({ restaurants: restaurants })
        // })
      })

  },

  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
      callback({ restaurant: restaurant.toJSON() })
    })
  },


}


module.exports = adminService