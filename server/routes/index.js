const router = require('koa-router')()
const tokenController = require('./utils/token')
const dbController = require('../db/controller')
const sha1 = require('sha1')

// 登入
router.post('/login', async function (ctx, next) {

    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);

    let registered, ret, sta, token;

    // 查询是否有该用户
    await dbController.findUser(username).then(v => {
        registered = v
    }).catch(e => {
        console.log(e)
    })

    if (!registered) {
        ret =  '用户不存在！';
        sta = 0;
    } else if (registered.password == password) {
        // 生成一个新的token，并保存到数据库
        let _token = tokenController.createToken(username);
        registered.token = _token;
        await new Promise((resolve, reject) => {
            registered.save((err, rep) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        }).then(v => {
            sta = 1;
            ret = '登入成功!';
            token = _token;
        }).catch(e => {
            console.log("Error:[registered.save] ", e);
        })
    } else {
        sta = 0;
        ret = '密码错误！';
        token = '';
    }
    
    ctx.response.body = {
        sta,
        msg: ret,
        token
    }
})

// 注册
router.post('/register', async function (ctx, next) {

    let user = {
        username: ctx.request.body.username,
        password: sha1(ctx.request.body.password),
        token: tokenController.createToken(ctx.request.body.username),
    }

    // 检测用户是否存在，并添加数据库
    let registered = await dbController.Register(user);

    let ret, sta;
    if (registered === 0) {
        ret = '用户已存在！';
        sta = 0;
    } else if (registered === 1) {
        ret = '注册成功！';
        sta = 1;
    } else {
        ret = '注册失败！';
        sta = 0;
    }
    
    ctx.response.body = {
        sta,
        msg: ret
    }
})

// 获取全部用户信息
router.get('/getuserinfo', tokenController.checkToken, async function (ctx, next) {
    let info = await dbController.findAllUser();
    ctx.body = {
        sta: 1,
        msg: info
    }
})

// 删除用户
router.post('/deluser', tokenController.checkToken, async function (ctx, next) {
    let id = ctx.request.body.id;

    console.log("id: ", id);
    
    let msg;
    try {
        await dbController.delUser(id);
        sta = 1;
        msg = '删除成功！';
    } catch (error) {
        sta = 0;
        msg = '删除失败！'
        console.log(error)
    }

    ctx.body = {
        sta,
        msg
    }
    
})

module.exports = router