<template>
    <van-list 
    v-model="filmLoading" 
    @load="getFilmList" 
    :finished="Finished" 
    finished-text="没有更多了"
    :immediate-check="true"
    ref="mybox"
    >
        <div class="page-home-films">
            <Banner class="banner" :list="bannerList" pagination loop/>

            <div class="city-fixed" @click="handleGoCity">
            <!--
                curCityInfo 可能在初次渲染的时候，ajax 请求还没有完成，导致得到 undefined 。再导致 .name 报错
            -->
            <span>{{curCityInfo && curCityInfo.name}}</span>
            <i class="iconfont icon-xiala"></i>
            </div>

            <van-tabs v-model="curFilmType"  sticky>
                <van-tab title="正在热映">
                    <Filmlist filmType="nowPlaying" :list="filmList"/>
                </van-tab>
                <van-tab title="即将上映">
                    <Filmlist filmType="comingSoon" :list="filmList"/>
                </van-tab>
            </van-tabs>
        </div>
    </van-list>
</template>

<script>
import Banner from '@/components/Banner';
import Filmlist from '@/components/FilmList';
import {mapState,mapActions,mapGetters} from 'vuex';

export default {
    name:'films',
    components:{
        Banner,
        Filmlist,
    },
    computed:{
        ...mapState('film',['bannerList','filmList']),
        ...mapGetters('film',['Finished']),
        ...mapGetters('city',['curCityInfo']),

        curFilmType:{
            get(){
                return this.$store.state.film.curFilmType
            },
            set(value){
                this.$store.commit({
                    type:'film/setcurFilmType',
                    filmType:value
                })
            }
        },
        filmLoading:{
            get(){
                return this.$store.state.film.filmLoading
            },
            set(value){
                this.$store.commit({
                    type:'film/setFilmLoading',
                    loading:value
                })
            }
        }
    },

    watch:{
        curFilmType(){
            //当curFilmType发生变化了，就重新发送请求
            // 0.将滚动条滚动到顶部
            this.$refs.mybox.$el.scrollTop = 0;
            //1.先将所有filmList数据清空，然后将pageNum设置为1
            this.getFilmList(true);
        }
    },

    methods:{
        ...mapActions('film',['getBannerList','getFilmList']),

        //跳转到城市选择页面
        handleGoCity(){
            this.$router.push('/city')
        }
    },
    created(){
        this.getBannerList();
        // this.getFilmList();
    }
}
</script>

<style  lang="scss">
    .page-home-films{
        .banner{
            img{
                width:100%;
            }
        }
    }
    .city-fixed {
        position: absolute;
        top: 18px;
        left: 7px;
        color: #fff;
        z-index: 10;
        font-size: 13px;
        background: rgba(0, 0, 0, 0.2);
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        text-align: center;
        padding: 0 5px;

        i {
        font-size: 12px;
        margin-left:5px;
        }
    }
</style>

