// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vueresource from 'vue-resource'
import Vuex from 'vuex'
import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload
} from 'mint-ui'
import Mintui from 'mint-ui'
import '../node_modules/mint-ui/lib/style.css'
import './assets/css/mui.min.css'
import './assets/css/icons-extra.css'
import './assets/css/golbal.css'
import moment from 'moment'
import VuePreview from 'vue-preview'



Vue.use(VuePreview)
Vue.use(Mintui)
Vue.config.devtools = true
Vue.use(Vueresource)
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
Vue.use(Vuex)
/* eslint-disable no-new */

Vue.config.productionTip = false
Vue.filter('dateFormat', function (dataStr, pattern = " YYYY-MM-DD hh:mm:ss ") {
  return moment(dataStr).format(pattern);
})

let cart = JSON.parse(localStorage.getItem('Cart') || '[]')
var store = new Vuex.Store({
  state: {
    cart: cart
  },
  mutations: {
    addTocart(state, Goodsinfo) {
      var flag = false;
      state.cart.some(item => {
        if (item.id == Goodsinfo.id) {
          item.count += parseInt(Goodsinfo.count);
          flag = true;
          return true;
        }
      })
      if (!flag) {
        state.cart.push(Goodsinfo);
      }
      localStorage.setItem('Cart', JSON.stringify(state.cart));
    },
    updateGoodsinfo(state, goodsinfo) {
      state.cart.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      localStorage.setItem('Cart', JSON.stringify(state.cart));
    },
    deletecartinfo(state, id) {
      state.cart.some((item, i) => {
        if (item.id == id) {
          state.cart.splice(i, 1)
          return true;
        }
      });
      localStorage.setItem('Cart', JSON.stringify(state.cart));
    },
    updategoodsSelected(state, info) {
      state.cart.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
          return true;
        }
      });
      localStorage.setItem('Cart', JSON.stringify(state.cart));
    }
  },
  getters: {
    getAllcount(state) {
      var c = 0;
      state.cart.forEach(item => {
        c += item.count;
      })
      return c
    },
    getshopcartcount(state) {
      var c = {};
      state.cart.forEach(item => {
        c[item.id] = item.count
      })
      return c;
    },
    getgoodsSelected(state) {
      var o = {};
      state.cart.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getgoodscountAndamount(state) {
      var o = {
        count: 0, //勾选的数量
        amount: 0, //勾选的总价
      }
      state.cart.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.count * item.price;
        }
      });
      return o;
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
