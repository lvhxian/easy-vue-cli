// 上传到七牛的oss
const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

const ossConfig = require('../public/oss.config').cdn

const {
  ak, sk, bucket
} = ossConfig

// 验证用户权限
const mac = new qiniu.auth.digest.Mac(ak, sk)
// 初始化配置
const config = new qiniu.conf.Config()
// 初始化
config.zone = qiniu.zone.Zone_z2 // 对应到选择的地区（华南是z2）
// 上传配置
const doUpload = (key, file) => {
  const options = {
    scope: bucket + ':' + key
  }
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        resolve(body)
      }
    })
  })
}

const publicPath = path.join(__dirname, '../build') // 上传文件地址
// 获取所有上传文件（包括多重嵌套）
const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    // 递归查询文件夹
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(key, filePath)
      .then(resp => console.log(resp))
      .catch(err => console.error(err))
  })
}

// 使用上传
uploadAll(publicPath)
