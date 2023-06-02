/**
 *@author: Zhang Xiao
 *@date: 2023-06-01 14:01:07
 *@version: v1.0.0
 **/

/* 获取页面的文件 */
const admin = document.querySelector('#admin')
const password = document.querySelector('#password')
const check = document.querySelector('#check')
const btn = document.querySelector('#btn')

/* 获取页面的数据 */
function getAccount () {
  return admin.value
}
function getPassword () {
  return password.value
}

/* 登录按钮绑定事件 */
btn.addEventListener('click', () => {
  let account = getAccount().trim()
  let password = getPassword().trim()
  if (!account || !password) {
    alert('请正确输入!')
  }

  //利用正则表达式判断输入是否正确,检查密码格式
  const passReg = /^(?=.*[A-Z])(?=.*[a-z])(?![0-9]+$)(?![^0-9]+$)(?![a-zA-Z]+$)(?![^a-zA-Z]+$)(?![a-zA-Z0-9]+$)[a-zA-Z0-9\\S]{8,16}$/
  if(!passReg.test(password)){
    alert('密码格式不正确!')
  }

  const data = {
    account: account,
    password: password,
    login_time: Date.now()
  }

  //将页面的数据发送到到后端去
  axios({
    method: 'POST',
    url: 'http://localhost:8010/userinfo',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    console.log(res)
  })
})

/* 用户点击了记住我的按钮，则下次登录时可以直接登录 */

