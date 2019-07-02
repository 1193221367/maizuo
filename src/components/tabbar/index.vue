<template>
    <div class="my-tabbar">
        <ul class="my-tabbar-ul">
            <li class="my-tabbar-li" 
                v-for="(tab,index) in tabs"
                :key="index"
            >
                <router-link :to="tab.to" active-class="active">
                    <i class="iconfont" :class="tab.icon"></i>
                    <span>{{tab.name}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'Tabbar',
    props:{
        tabs:{
            type:Array,
            default(){
                return [];
            }
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/styles/common/px2rem.scss';
    @import '../../assets/styles/common/mixins.scss';
    .my-tabbar{
        @include border-top;
        height:px2rem(49);
        background:#fff;
        &-ul{
            height:100%;
            display:flex;         
        }
        &-li{
            flex:1;
            a{
                display:flex;
                height:100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color:#797d82;
                font-size: 10px;
                span{
                    margin-top:5px;
                }
                i{
                    font-size: 20px;
                }
                &.active{
                    color:#ff5f16;
                }
            }
        }
    }
</style>
