const fs = require('fs')
const db = require('../models')
const Category = db.Category
const Restaurant = db.Restaurant
const User = db.User
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const adminService = require('../services/adminServices.js')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })

    // return Restaurant.findAll({
    //   raw: true,
    //   nest: true,
    //   include: [Category]
    // }).then(restaurants => {
    //   console.log(restaurants) // 加入 console 觀察資料的變化
    //   return res.render('admin/restaurants', { restaurants: restaurants })
    // })
  },

  createRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', {
        categories: categories
      })
    })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },

  // postRestaurant: (req, res) => {
  //   if (!req.body.name) {
  //     req.flash('error_messages', "name didn't exist")
  //     return res.redirect('back')
  //   }

  //   const { file } = req
  //   if (file) {
  //     imgur.setClientID(IMGUR_CLIENT_ID);
  //     imgur.upload(file.path, (err, img) => {
  //       return Restaurant.create({
  //         name: req.body.name,
  //         tel: req.body.tel,
  //         address: req.body.address,
  //         opening_hours: req.body.opening_hours,
  //         description: req.body.description,
  //         image: file ? img.data.link : null,
  //         CategoryId: req.body.categoryId
  //       }).then((restaurant) => {
  //         req.flash('success_messages', 'restaurant was successfully created')
  //         return res.redirect('/admin/restaurants')
  //       })
  //     })
  //   }
  //   else {
  //     return Restaurant.create({
  //       name: req.body.name,
  //       tel: req.body.tel,
  //       address: req.body.address,
  //       opening_hours: req.body.opening_hours,
  //       description: req.body.description,
  //       image: null,
  //       CategoryId: req.body.categoryId
  //     }).then((restaurant) => {
  //       req.flash('success_messages', 'restaurant was successfully created')
  //       return res.redirect('/admin/restaurants')
  //     })
  //   }
  // },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.render('admin/restaurant', data)
    })
    // return Restaurant.findByPk(req.params.id, {
    //   include: [Category]
    // }).then(restaurant => {
    //   // console.log(restaurant)// 加入 console 觀察資料的變化
    //   return res.render('admin/restaurant', {
    //     restaurant: restaurant.toJSON()
    //   })
    // })
  },

  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant.toJSON()
        })
      })
    })
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },
  // putRestaurant: (req, res) => {
  //   if (!req.body.name) {
  //     req.flash('error_messages', "name didn't exist")
  //     return res.redirect('back')
  //   }
  //   if (!req.body.tel) {
  //     req.flash('error_messages', "telephone number didn't exist")
  //     return res.redirect('back')
  //   }
  //   if (!req.body.address) {
  //     req.flash('error_messages', "address didn't exist")
  //     return res.redirect('back')
  //   }
  //   if (!req.body.description) {
  //     req.flash('error_messages', "description didn't exist")
  //     return res.redirect('back')
  //   }

  //   const { file } = req
  //   if (file) {
  //     imgur.setClientID(IMGUR_CLIENT_ID);
  //     imgur.upload(file.path, (err, img) => {
  //       return Restaurant.findByPk(req.params.id)
  //         .then((restaurant) => {
  //           restaurant.update({
  //             name: req.body.name,
  //             tel: req.body.tel,
  //             address: req.body.address,
  //             opening_hours: req.body.opening_hours,
  //             description: req.body.description,
  //             image: file ? img.data.link : restaurant.image,
  //             CategoryId: req.body.categoryId
  //           })
  //             .then((restaurant) => {
  //               req.flash('success_messages', 'restaurant was successfully to update')
  //               res.redirect('/admin/restaurants')
  //             })
  //         })
  //     })
  //   }
  //   else {
  //     return Restaurant.findByPk(req.params.id)
  //       .then((restaurant) => {
  //         restaurant.update({
  //           name: req.body.name,
  //           tel: req.body.tel,
  //           address: req.body.address,
  //           opening_hours: req.body.opening_hours,
  //           description: req.body.description,
  //           image: restaurant.image,
  //           CategoryId: req.body.categoryId
  //         })
  //           .then((restaurant) => {
  //             req.flash('success_messages', 'restaurant was successfully to update')
  //             res.redirect('/admin/restaurants')
  //           })
  //       })
  //   }
  // },


  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },

  // deleteRestaurant: (req, res) => {
  //   return Restaurant.findByPk(req.params.id)
  //     .then((restaurant) => {
  //       restaurant.destroy()
  //         .then((restaurant) => {
  //           res.redirect('/admin/restaurants')
  //         })
  //     })
  // },



  getUsers: (req, res) => {
    return User.findAll({ raw: true })
      .then(users => { return res.render('admin/users', { users }) })
  },

  toggleAdmin: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      if (user.isAdmin) {
        user.isAdmin = false
      } else {
        user.isAdmin = true
      }
      return user.save()
    })
      .then(user => {
        req.flash('success_msg', `${user.name}已成功修改權限至: ${Object.keys(req.body)}!`)
        return res.redirect('/admin/users')
      })
  }

}

module.exports = adminController