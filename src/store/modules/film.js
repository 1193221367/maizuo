import axios  from 'axios';
import {Toast} from 'vant';

const state = {
    bannerList:[],
    filmList:[],
    curFilmType:0,//当前影片的类型
    filmLoading:false,//影片加载状态
    pageNum:1, //页码
    pageSize:10,//每页10条
    total:1,//总条数
};

const getters = {
    //总页数
    totalPage(state){
        return Math.ceil(state.total / state.pageSize);
    },
    //是否还有更多数据,为true代表没有更多数据
    Finished(state,getters){
        return state.pageNum > getters.totalPage;
    }
};

const mutations = {
    setBannerList(state,payload){
        state.bannerList = payload.list
    },
    setFilmList(state,payload){
        state.filmList = payload.list
        state.total = payload.total
    },
    setcurFilmType(state,payload){
        state.curFilmType = payload.filmType
    },
    setFilmLoading(state,payload){
        state.filmLoading = payload.loading
    },
    setPageNum(state,payload){
        state.pageNum = payload.num
    }
};

const actions = {
    getBannerList( {commit} ){
        axios.get('https://m.maizuo.com/gateway?type=2&cityId=110100&k=1633668',{
            headers:{
                'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"156196531434359738595"}',
                'X-Host':'mall.cfg.common-banner'
            }
        }).then(response => {
            let res = response.data;
            if(res.status === 0){
                commit({
                    type:"setBannerList",
                    list:res.data
                })
            }else{
                alert(res.msg)
            }
        })
    },
    //ChangeFilmType    boolean     是否是切换影片类型之后的获取数据
    getFilmList( {commit,state,rootState},ChangeFilmType){
        // 判断ChangeFilmType
        if(ChangeFilmType){
            //清空filmList
            // commit({type:'setFilmList',list:[],total:1})
            //将pageNum设置为1
            commit({type:'setPageNum',num:1})
        }
        Toast.loading({
            mask:true,
            duration:0,
            message:'加载中...'
        })
        axios.get('https://m.maizuo.com/gateway',{
                
            params:{
                cityId:rootState.city.curCityId,
                pageNum:state.pageNum,
                pageSize:state.pageSize,
                type:state.curFilmType === 0 ? 1 : 2,
                k:6291437
            },
            
            headers:{
                'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"1562069716261993005167"}',
                'X-Host':'mall.film-ticket.film.list'
            }
        }).then(response => {
            let res = response.data;
            
            if(res.status === 0){ 
                // console.log(res)
                commit({
                    type:"setFilmList",
                    // list:res.data.films,
                    // 数据追加
                    // list:state.filmList.concat(res.data.films),  ok
                    // list:state.filmList.push(res.data.films),   no
                    // list:state.filmList.push(...res.data.films),   ok
                    list:ChangeFilmType ? res.data.films : [...state.filmList, ...res.data.films],   //ok
                    total:res.data.total
                })
            }else{
                Toast(res.msg);
            }
            //1.数据加载完成，需要将filmLoading设置为false
            commit({type:'setFilmLoading',loading:false})
            // 2.数据加载完成，需要将页码++
            commit({type:'setPageNum',num:state.pageNum + 1})
            // 3.判断是否是最后一页，已经交给Finised处理了
            // 4.数据追加，而不是赋值
            Toast.clear();
        })
    },
    
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}