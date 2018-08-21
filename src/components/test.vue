<template>
    <div>
        <p>test</p>
        {{ users }}

        <el-button @click="tohome()">返回</el-button>
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
        this.$ajax.getUserInfo().then(response => {
            this.users = response.data.msg
        })
    },
    methods: {
        tohome() {
            // this.$router.go(-1)
            this.$router.push('/');
        }
    }
}
</script>
