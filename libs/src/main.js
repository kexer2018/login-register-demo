/**
 *@author: Zhang Xiao
 *@date: 2023-06-01 10:06:29
 *@version: v1.0.0
 **/
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const database = require('../database/index')

const app = express()

app.use(express.static('public'))
//处理请求的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

//数据库启动
database.StartSQL()

app.listen(8010, () => {
  console.log('server is running on 8010')
})
