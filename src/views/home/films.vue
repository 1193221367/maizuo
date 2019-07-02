<template>
    <div class="page-home-films">
        <Banner class="banner" :list="bannerList" pagination loop/>
    </div>
</template>

<script>
import Banner from '@/components/Banner';
import {mapState,mapActions} from 'vuex';

export default {
    name:'films',
    components:{
        Banner,
    },
    computed:{
        ...mapState('film',['bannerList'])
    },
    methods:{
        ...mapActions('film',['getBannerList'])
    },
    created(){
        this.getBannerList();
        // setTimeout(() => {
        //     this.$store.commit('film/setBannerList',{
        //         list:[
        //             {
        //                 bannerID:1,
        //                 imgUrl:"https://static.maizuo.com/v5/upload/ec37728b66e7f4bcfa0aa31b3d3afa5f.jpg?x-oss-process=image/quality,Q_70"
        //             },
        //             {
        //                 bannerID:2,
        //                 imgUrl:"https://static.maizuo.com/v5/upload/11383fd13de7b161c70b20c9c8cea9fd.jpg?x-oss-process=image/quality,Q_70"
        //             },
        //         ]
        //     })
        // }, 2000);
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

