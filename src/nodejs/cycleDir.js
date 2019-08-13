/**
 * 遍历文件
 */
const fs = require('fs')
const path = require('path')

const readDir = entry => {
  const dirs = fs.readdirSync(entry)
  dirs.forEach(item => {
    const dirPath = path.join(entry, item)
    const info = fs.statSync(dirPath)
    if (info.isDirectory()) {
      console.log(`dir: ${dirPath}`)
      readDir(dirPath)
    }

    console.log(`file: ${dirPath}`)
  })
}

readDir(__dirname)
