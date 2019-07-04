<template>
    <div class="my-filmlist">
        <ul>
            <li class="item" v-for="item in list" :key="item.filmId">
                <router-link 
                :to="{
                    name:'film',
                    params:{
                        filmId:item.filmId
                    }
                }">
                <div class="img">
                    <img :src="item.poster" alt />
                </div>
                <div class="info">
                    <div class="film-name info-col">
                    <span class="name">{{item.name}}</span>
                    <span class="item">{{item.filmType.name}}</span>
                    </div>
                    <div class="film-grade info-col" style="visibility: visible;" v-show="filmType==='nowPlaying'">
                    <span class="label">观众评分</span>
                    <span class="grade">{{item.grade}}</span>
                    </div>
                    <div class="film-actors info-col">
                    <span class="label">主演：{{ item.actors | actorFormat }}</span>
                    </div>
                    <div class="film-detail info-col" v-show="filmType==='nowPlaying'">
                    <span class="label">{{item.nation}} | {{item.runtime}}分钟</span>
                    </div>
                    <div class="film-detail info-col" v-show="filmType==='comingSoon'">
                    <span class="label">上映日期：{{item.premiereAt }}</span>
                    </div>
                </div>
                <div class="buy" v-show="filmType==='nowPlaying'">购票</div>
                <div class="buy" 
                v-if="item.isPresale"
                v-show="filmType==='comingSoon'"
                style="color:#ffb232" 
                :isSale="item.isSale">预约</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'FilmList',
    props:{
        list:{
            type:Array,
            default(){
                return [];
            }
        },
        filmType:String,
        
    },
    // 获取主演列表中的每个名字
    methods:{
        // actorFormat(actors){
        //     // console.log(actors.map(item => item.name))
        //     let tmp = actors.map(item => item.name);
        //     return tmp.join(' ');
        // }
    },

    //过滤器-做数据格式化操作
    filters:{
        actorFormat(actors = []){
            // console.log(actors)
            // let actors = actors || []    判断如果数据为空，则定义一个空数组,防止报错
            let tmp = actors.map(item => item.name);
            return tmp.length ? tmp.join(' ') : '暂无主演';
        },
        // transiTime(premiereAt){
        //     let m = premiereAt;
        //     console.log(Date.getTime(m))
        // }
        
    },
}
</script>

<style lang="scss">
@import "~@/assets/styles/common/mixins.scss";

.my-filmlist {
  ul {
    margin-left: 15px;
    li {
      @include border-bottom;
      padding: 15px 15px 15px 0;
      height: 94px;
      position: relative;
      box-sizing: content-box;

      > a {
        display: flex;
        height:94px;
        align-items: center;
        font-family:Microsoft YaHei,Tahoma,Helvetica,Arial,sans-serif;
        color:#333;
        >div{
            box-sizing: border-box;
        }
      }

      .img {
        flex-shrink: 0;
        width: 66px;
        height: 94px;
        background: rgb(249, 249, 249);
        vertical-align:center;
        img {
          width: 100%;
          border-radius: 2px;
          
        }
      }

      .info {
        flex: 1;
        padding: 0 10px;
        overflow: hidden;
        .info-col {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        .film-name {
            height:20px;
            line-height: 14px;
          .name {
            max-width: calc(100% - 25px);
            color: #191a1b;
            font-size: 16px;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item {
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
          }
        }

        .film-grade {
            height: 20px;
            line-height:14px;
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
          .grade {
            color: #ffb232;
            font-size: 13px;
            margin-left:5px;
          }
        }

        .film-actors {
            height:20px;
            line-height: 14px;
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }

        .film-detail {
            height:20px;
            line-height: 14px;
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }
      }

      .buy {
        @include border;
        flex-shrink: 0;
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        position: relative;
      }
    }
  }
}
</style>
