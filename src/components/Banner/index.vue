<template>
    <div ref="banner" class="my-banner swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
            v-for="item in list"
            :key="item.bannerId"
            >
                <img :src="item.imgUrl" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" v-if="pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        <template v-if="navigation">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </template>
        
        
        <!-- 如果需要滚动条 -->
        <div class="~swiper-scrollbar" v-if="scrollbar"></div>
    </div>
</template>


<script>
import Swiper from 'swiper';
export default {
    name:"Banner",

    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        },

        loop:{
            type:Boolean,
            default:false
        },
        pagination: {
            type:Boolean,
            default:false
        },
        navigation:{
            type:Boolean,
            default:false
        },
        scrollbar:{
            type:Boolean,
            default:false
        }
    },

    // 监听list.length的变化改变，实现数据更新和初始化操作
    watch:{
        // list(newVal,oldVal){
        list(){
            if(this.mySwiper){
                this.mySwiper.destroy()
            }
            this.$nextTick(()=>{
                this.initSwiper();
            })
        }
    },

    methods:{
        initSwiper(){
            let container = this.$refs.banner;
            this.mySwiper = new Swiper(container,{
                loop: this.loop,
                // autoplay:true,
                pagination: this.pagination ? {
                    el: '.swiper-pagination',
                }
                :{},
                navigation: this.navigation ? {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
                :{},
                scrollbar: this.scrollbar ? {
                    el: '.swiper-scrollbar',
                }
                :{},
            })
        },
    },

    // updated(){
    //     if(this.mySwiper){
    //         //已经被初始化
    //         this.mySwiper.destroy();
    //         this.initSwiper();
    //     }else{
    //         //没有被初始化
    //         this.initSwiper();
    //     }

    //     // if(this.list.length && !this.mySwiper){
    //     //     console.log("list变化了")
    //     //     this.initSwiper();
    //     // }

    //     // if(this.list.length){
    //     //     this.mySwiper.update();
    //     // }
    // },
}
</script>

<style lang="scss">
@import "~swiper/dist/css/swiper.css";
@import '~@/assets/styles/common/px2rem.scss';

.my-banner{
    height:px2rem(210);
}
</style>


