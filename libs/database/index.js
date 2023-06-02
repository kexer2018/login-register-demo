/**
 *@author: Zhang Xiao
 *@date: 2023-06-01 10:05:11
 *@version: v1.0.0
 **/
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

//初始化数据库
let db = null
function SQLiteInit () {
  try {
    const rootPath = path.join(__dirname, './user.db')
    db = new sqlite3.Database(rootPath)
    console.log('数据库创建成功!!')
  } catch (err) {
    throw err
  }
}

//创建一个数据库表
function createTable () {
  const sql = `CREATE TABLE IF NOT EXISTS 'userInfo'(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        account TEXT NOT NULL,
        name TEXT ,
        password TEXT NOT NULL,
        login_time TIMESTAMP  DEFAULT (datetime('now')),
        register_time TIMESTAMPTZ  DEFAULT (datetime('now')),
        quit_time TIMESTAMPTZ  DEFAULT (datetime('now'))
    ) `
  db.run(sql)
}

//方法封装成一个类
class User {
  //获取所有的用户
  static all (cb) {
    const sql = `SELECT * FROM userInfo `
    db.all(sql, cb)
  }
  //根据id获取用户的信息
  static find (id, cb) {
    const sql = `SELECT * FROM userInfo WHERE id=? `
    db.get(sql, id, cb)
  }
  //新增一条用户数据
  static insert (data, cb) {
    const sql = `INSERT INTO userInfo (account,name,password,login_time,register_time,quit_time) VALUES (?,?,?,?,?,?)`
    db.run(
      sql,
      data.account,
      data.name,
      data.password,
      data.login_time,
      data.register_time,
      data.quit_time,
      cb
    )
  }
  //删除用户的信息
  static remove (id, cb) {
    if (!id) {
      return cb(new Error(`缺少参数id`))
    }
    const sql = `DELETE FROM userInfo WHERE id=? `
    db.run(sql, id, cb)
  }

  //更新一条用户数据
  static update (data, cb) {
    const sql = ` UPDATE userInfo SET name=?,password=?,login_time=?,register_time=?,quit_time=? WHERE id=?`
    db.run(
      sql,
      data.name,
      data.password,
      data.login_time,
      data.register_time,
      data.quit_time,
      data.id,
      cb
    )
  }
}

const StartSQL = () => {
  SQLiteInit()
  createTable()
}

module.exports = {
  StartSQL,
  User
}
