const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const db = {}
fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const {name, model} = require(path.join(__dirname, file))(mongoose)
    db[name] = model
  })

db.mongoose = mongoose

module.exports = db
