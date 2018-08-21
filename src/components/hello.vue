<template>
    <div>
        <h1>
            hello!
        </h1>
        <el-button @click="logout()">退出</el-button>
        <ul>
            <li v-for="(item,index) in users" :key="item._id">
                {{ index + 1 }}.{{ item.username }}
                <el-button @click="del_user(index, item._id)">注销用户</el-button>
            </li>
        </ul>
        <el-button @click="totest()">go test!</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        // 获取用户信息
        
        this.$ajax.getUserInfo().then(response => {
            console.log(response)
            this.users = response.data.msg
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        del_user(index, id) {
            this.$ajax.delUser({ id }).then(response => {
                console.log(response);
                if (response.data.sta === 0) {
                    this.$message.error(response.data.msg)
                } else {
                    this.users.splice(index, 1);
                    this.$message.success(response.data.msg)
                }
                
            }).catch(error => {
                console.log(error);
            })
        },
        logout() {
            this.$store.commit('LOGOUT')
            this.$router.push('/login')
        },
        totest() {
            this.$router.push('/test')
        }
    }
}
</script>
