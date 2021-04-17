
const db = require('../../models')
const Category = db.Category
const Restaurant = db.Restaurant

const adminService = require('../../services/adminServices.js')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })
    // return Restaurant.findAll({
    //   raw: true,
    //   nest: true,
    //   include: [Category]
    // }).then(restaurants => {
    //   console.log(restaurants) // 加入 console 觀察資料的變化
    //   return res.json({ restaurants: restaurants })
    // })
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = adminController