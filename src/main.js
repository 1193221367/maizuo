import Vue from 'vue';
import router from './router';
import App from './App';
import store from './store';
import {Tab,Tabs,Toast,List,Search} from 'vant';
import './assets/styles/base.scss';

Vue.use(Tab).use(Tabs).use(Toast).use(List).use(Search)

new Vue({
    el:'#app',
    router,
    store,
    render:h => h(App)
})