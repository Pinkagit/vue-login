const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/login', { useNewUrlParser:true })

let db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', () => {
    console.log('数据库连接错误！')
})

db.on('open', () => {
    console.log("数据库连接成功！")
})

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    create_time: Date
})

let model = {
    User: mongoose.model('User', userSchema)
}

module.exports = model