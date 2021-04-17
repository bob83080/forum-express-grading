
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

  }
}


module.exports = adminService