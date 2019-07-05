<template>
  <div class="page-city">
    <div class="header">
        <div class="left" @click="outsearch">
            <i class="iconfont icon-untitled94" style="font-size: 16px;"></i>
        </div> 
        <div class="title">当前城市 - </div>
    </div>
    <van-search
        v-model="searValue" 
        placeholder="输入城市名或拼音"
    />
    <!-- 拼音检索 -->
    <div class="lv-indexlist" v-show="!searValue">
      <ul class="lv-indexlist__content" ref="lv-indexlist__content">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text">定位失败</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail">
              <li
                v-for="item in hotCity" 
                :key="item.cityId"
                @click="handleChgCity(item)"
                class="city-item-detail"
              >
                <div class="city-item-text">{{item.name}}</div>
              </li>
            </ul>
          </div>
        </div>
        <li :ref="'box_' + item.py" class="lv-indexsection"
            v-for="item in cityList" 
            :key="item.py" 
        >
          <p class="lv-indexsection__index">{{item.py}}</p>
          <ul>
            <li
                v-for="city in item.list" 
                :key="city.cityId"
                @click="handleChgCity(city)"
                >{{city.name}}
            </li>
          </ul>
        </li>
      </ul>
      <div class="lv-indexlist__nav">
        <ul>
          <li 
            v-for="item in getPy" 
            :key="item" 
            style="text-align:center"
            @click="goTop(item)"
            >{{item}}
          </li>
        </ul>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="lv-indexlist" v-show="searValue">
        <ul class="search-box">
            <li 
            v-for="city in searchList" 
            :key="city.name"
            @click="handleChgCity(city)"
            >
            {{city.name}}
            </li>
        </ul>

      <div class="empty-result" v-show="!searchList.length">
        <img src="../../assets/images/empty.png" alt />
        <p>没有找到匹配的城市</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name:'city',
    computed:{
        ...mapGetters('city',['cityList','hotCity','getPy','searchList']),

        //搜索关键字
        searValue:{
            get(){
                return this.$store.state.city.searValue
            },
            set(value){
                this.$store.commit({
                    type:'city/setSearchVal',
                    value,
                })
            }
        }
    },
    methods:{

        //点击右侧拼音首字母，滚动到对应元素至顶部
        goTop(py){
            // 1.找到左侧对应的dom元素
            let el = this.$refs["box_"+py][0];
            let box = this.$refs['lv-indexlist__content'];
            // console.log(box)
            // 得到当前el距离顶部的距离
            let offsetTop = el.offsetTop;
            // 3.操作左侧的滚动条
            box.scrollTop = offsetTop;
        },
        outsearch(){
            this.$router.go(-1);
        },
        //修改当前选择的城市
        handleChgCity(city){
            // 获取当前点击的城市的id
            let cityId = city.cityId;
            // 将仓库中的相关数据做修改
            this.$store.commit({
                type:'city/setCurCityId',
                cityId,
            });
            // 编程式导航，选择城市以后跳转至films页
            this.$router.back();
            // 将城市id本地存储
            window.localStorage.setItem('curCityId',cityId);
        }
    },
    
}
</script>

<style lang="scss">
@import "./index.scss";
</style>