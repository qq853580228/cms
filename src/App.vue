<template>
  <div class="app-contain">
    <mt-header fixed title="大萌神♡周杰倫 - Vue">
      <span @click="goback" slot="left" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    
    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb"  to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb"  to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb"  to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="shopcart">{{ $store.getters.getAllcount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb"  to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
import Homecontainer from './components/tabbar/Homecontainer.vue'
import Membercontainer from './components/tabbar/Membercontainer.vue'
import Searchcontainer from './components/tabbar/Searchcontainer.vue'
import Shopcarcontainer from './components/tabbar/Shopcarcontainer.vue'
export default {
  name: 'App',
  data() {
    return {
      flag: false
    }
  },
  methods:{
    goback(){
      this.$router.go(-1);
    }
  },
  components:{
    Homecontainer,
    Membercontainer,
    Searchcontainer,
    Shopcarcontainer
  },
  watch:{
    '$route.path': function( now ){
      if( now === '/home' ){
      this.flag = false;
    }else{
      this.flag = true;
    }
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-header{
  z-index: 99;
  }
.app-contain{
  
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px;
}
.v-enter{
  opacity: 0;
  transform: translateX(100%);
  
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active{
  transition: all 0.8s ease;
  
}
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb{
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
