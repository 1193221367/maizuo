<template>
    <van-list v-model="filmLoading" @load="getFilmList" :finished="Finished" finished-text="没有更多了">
        <div class="page-home-films">
            <Banner class="banner" :list="bannerList" pagination loop/>
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
            //1.先将所有filmList数据清空，然后将pageNum设置为1
            this.getFilmList(true);
        }
    },

    methods:{
        ...mapActions('film',['getBannerList','getFilmList']),
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
</style>

