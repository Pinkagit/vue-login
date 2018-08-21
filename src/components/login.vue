<template>
    <div class="container">
        <el-tabs type="border-card" class="box">
            <el-tab-pane label="login">
                <el-form ref="form" :model="loginData" label-width="80px">
                    <el-form-item label="Username">
                        <el-input v-model="loginData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input type="password" v-model="loginData.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Login">登入</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="regist">
                <el-form ref="re-form" status-icon :model="registData" label-width="80px" :rules="rules">
                    <el-form-item label="Username">
                        <el-input v-model="registData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="password" prop="password">
                        <el-input type="password" v-model="registData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="repassword" prop="repassword">
                        <el-input type="password" v-model="registData.repassword"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="Regist">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value == '') {
                callback(new Error("please input password."))
            } else {
                if (this.registData.repassword !== '') {
                    this.$refs['re-form'].validateField('repassword')
                }
                callback();
            }
        }

        let validateRepass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("please input password."))
            } else if (value !== this.registData.password) {
                callback(new Error("The twice input is not in accord"))
            } else {
                callback()
            }
        }

        return {
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validateRepass, trigger: 'blur' }
                ]
            },
            loginData: {
                username: '',
                password: ''
            },
            registData: {
                username: '',
                password: '',
                repassword: ''
            }
        }
    },
    methods: {
        Login() {
            console.log("loginData:", this.loginData)
            this.$ajax.userLogin(this.loginData).then(response => {
                console.log(response)
                
                if (response.data.sta === 0) {
                    this.$message.error(response.data.msg)
                    return;
                }

                this.$message.success(response.data.msg)
                this.$store.commit('LOGIN', response.data.token);
                // 跳转
                this.$router.push(this.$router.currentRoute.query.redirect)

            }).catch(error => {
                console.log(error)
            })
        },
        reset() {
            this.loginData.username = ''
            this.loginData.password = ''
        },
        Regist() {
            console.log("registData:", this.registData)
            this.$ajax.userRegister(this.registData).then(response => {
                console.log(response)

                if (response.data.sta === 0) {
                    this.$message.error(response.data.msg)
                    return;
                } 

                this.$message.success(response.data.msg);
                
            }).catch(error => {
                console.log(error)
            })
        }
    },
}
</script>

<style>
.container{
    margin: 0 auto;
    width: 400px;
    height: 100%;
}
.box{
    width: 100%;
    height: 500px;
    margin-top: 150px;
}
</style>
