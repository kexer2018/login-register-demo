/**
 *@author: Zhang Xiao
 *@date: 2023-06-01 10:07:44
 *@version: v1.0.0
 **/
const express = require('express')
const router = express.Router()
const database = require('../database/index')

/* 获取所有的用户数据 */
router.get('/userinfo', (req, res, next) => {
  database.User.all((err, info) => {
    if (err) {
      return next(err)
    }
    res.json({
      errcode: 0,
      errmeaasge: 'ok',
      data: null || info
    })
  })
})

/* 获取某个用户数据 */
router.get('/userinfo/:id', (req, res, next) => {
  database.User.find(req.params.id, (err, info) => {
    if (err) {
      return next(err)
    }
    res.json({
      errcode: 0,
      errmeaasge: 'ok',
      data: null || info
    })
  })
})

/* 增加一个用户数据 */
router.post('/userinfo', (req, res, next) => {
  let body = {
    account: req.body.account,
    name: req.body.name,
    password: req.body.password,
    login_time: req.body.login_time,
    register_time: req.body.register_time,
    quit_time: req.body.quit_time
  }
  console.log(body,'[body]')
  database.User.insert(body, (err, info) => {
    if (err) {
      return next(err)
    }
    res.json({
      errcode: 0,
      errmeaasge: 'ok',
      data: 'insert success !!'
    })
  })
})

/* 修改用户数据 */
router.put('/userinfo/:id', (req, res, next) => {
  let body = {
    id: req.params.id,
    name: req.body.name,
    password: req.body.password,
    login_time: req.body.login_time,
    register_time: req.body.register_time || null,
    quit_time: req.body.quit_time || null
  }
  database.User.update(body, (err, info) => {
    if (err) {
      return next(err)
    }
    res.json({
      errcode: 0,
      errmeaasge: 'ok',
      data: 'update success !!'
    })
  })
})

/* 删除某个用户数据 */
router.delete('/userinfo/:id', (req, res, next) => {
  database.User.remove(req.params.id, (err, info) => {
    if (err) {
      return next(err)
    }
    res.json({
      errcode: 0,
      errmeaasge: 'ok',
      data: 'delete success !!'
    })
  })
})
module.exports = router
