import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Homecontainer from '../components/tabbar/Homecontainer.vue'
import Membercontainer from '../components/tabbar/Membercontainer.vue'
import Searchcontainer from '../components/tabbar/Searchcontainer.vue'
import Shopcarcontainer from '../components/tabbar/Shopcarcontainer.vue'
import NewsList from '../components/news/NewsList.vue'
import NewsInfo from '../components/news/NewsInfo.vue'
import PhotosList from '../components/photos/PhotosList.vue'
import Photosinfo from '../components/photos/Photosinfo.vue'
import GoodsList from '../components/goods/GoodsList.vue'
import Goodsinfo from '../components/goods/Goodsinfo.vue'
import GoodsComment from '../components/goods/GoodsComment.vue'
import GoodsDesc from '../components/goods/GoodsDesc.vue'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Homecontainer },
    { path: '/member', component: Membercontainer },
    { path: '/shopcar', component: Shopcarcontainer },
    { path: '/search', component: Searchcontainer },
    { path: '/home/newlist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photoslist', component: PhotosList },
    { path: '/home/photosinfo/:id', component: Photosinfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: Goodsinfo, name: 'goodsinfo' },
    { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'descinfo' },
  ],
  linkActiveClass: 'mui-active'
  
})
