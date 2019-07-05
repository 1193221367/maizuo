<template>
    <keep-alive :include="['home']">
        <router-view></router-view>
    </keep-alive>
</template>


<script>
import {mapActions} from 'vuex';
export default {
    name:'App',

    methods:{
        ...mapActions('city',['getCitys'])
    },
    created(){
        // 判断本地存储中是否有citys的数据，如果有就不发送请求
        // let citys = window.localStorage.getItem('citys');
        // if(!citys){
        //    this.getCitys();
        // }
        this.getCitys();
    }
}
</script>

