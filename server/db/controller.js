const User = require('./db').User;
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp')

// 用户注册
const Register = async(ctx) => {
    let userDoc = new User({
        username: ctx.username,
        password: ctx.password,
        token: ctx.token
    })

    // 将objectid转换为用户创建时间
    userDoc.create_time = moment(objectIdToTimestamp(userDoc._id)).format('YYYY-MM-DD HH:mm:ss');
    
    let registered;

    try {
        let reply = await findUser(userDoc.username)
        if (reply) {
            registered = 0
        } else {
            await new Promise((resolve, reject) => {
                userDoc.save((err, rep) => {
                    if (err) {
                        reject(err)
                    }
                    registered = 1
                    resolve()
                })
            })
        }
    } catch (error) {
        console.log(error);
    }

    return registered;
}

// 登入
const Login = async(ctx) => {
}

// 查找用户
const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

// 查询所有用户信息
const findAllUser = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if (err) {
                reject(err)
            } 
            resolve(doc)
        })
    })
}

// 删除用户
const delUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({ _id: id }, (err, doc) => {
            if (err) {
                reject(err);
            }
            console.log("delete success!")
            resolve();
        })
    })
}

module.exports = {
    Register,
    findUser,
    findAllUser,
    delUser
}