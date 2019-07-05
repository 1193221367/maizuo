import axios  from 'axios';
import {Toast} from 'vant';

const state = {
    citys:window.localStorage.getItem('citys')//城市列表数据
    ? JSON.parse(window.localStorage.getItem('citys'))
    : [],
    searValue:'',//搜索关键字
    curCityId:window.localStorage.getItem('curCityId')
    ? window.localStorage.getItem('curCityId') - 0
    : 440300,//当前选择的城市ID
};

const getters = {
    //当前选择的城市的信息
    curCityInfo(state){
        return state.citys.find(item => item.cityId === state.curCityId)
    },

    //城市数据
    cityList(state){
        let result = [];
        state.citys.forEach(city => {
            let py = city.pinyin.charAt(0).toUpperCase();
            let index = result.findIndex(item => item.py === py)
            if(index > -1){
                result[index].list.push(city)
            }else{
                let obj = {
                    py,
                    list:[city]
                }
                result.push(obj)
            }
        });
        result = result.sort((a,b)=>{
            return a.py.charCodeAt() - b.py.charCodeAt()
        });
        return result;
    },
    //热门城市筛选
    hotCity(state){
        return state.citys.filter(item => item.isHot)
    },
    //右侧的字母导航条
    getPy(state,getters){
        return getters.cityList.map(item => item.py)
    },
    //搜索的结果,根据state中citys与searValue判断
    searchList(state){
        let tmp = [];
        if(state.searValue){
            tmp = state.citys.filter(item =>{
            return item.name.indexOf(state.searValue) > -1;
            })
        }
        return tmp;
    }
};

const mutations = {
    setSearchVal(state,payload){
        state.searValue = payload.value;
    },

    setCitys(state,payload){
        state.citys = payload.list;
    },

    setCurCityId(state,payload){
        state.curCityId = payload.cityId;
    }
};

const actions = {
    getCitys({commit}){
        // 判断有数据就不发送请求
        if(state.citys.length){
            return;
        }
        Toast.loading({
            mask:true,
            duration:0,
            message:'定位中...'}
            ),
        axios.get('https://m.maizuo.com/gateway?k=1030296',{
            headers:{
                'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"1562069716261993005167"}',
                'X-Host':'mall.film-ticket.city.list'
            }
        }).then(response =>{
            let res = response.data;
            if(res.status === 0){
                //将城市数据给到仓库
                commit({
                    type:'setCitys',
                    list:res.data.cities
                })
                //将城市数据本地储存起来
                window.localStorage.setItem(
                    'citys',
                    JSON.stringify(res.data.cities)
                )
            }else{
                Toast(res.msg)
            }
            Toast.clear();
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}