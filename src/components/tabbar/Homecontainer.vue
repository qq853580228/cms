﻿<template>
    <div> 
        <Swipe :lunbotulist="lunbotulist" :isfull="true"></Swipe>
         <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newlist">
                    <img src="../../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoslist">
                    <img src="../../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></router-link></li>
        </ul> 
    </div>
</template>


<script>
import Swipe from '../subcomponents/swipe.vue'


export default {
    data() {
        return {
            lunbotulist:[]
        }
    },
    created(){
        this.getlunbotu();
    },
    methods:{
        getlunbotu(){
            this.$http.get( "api/getlunbo" ).then( result =>{
                if( result.body.status === 0 ){
                    this.lunbotulist = result.body.message;
                }
            } )
        }
    },
    components:{
        Swipe,
    }
}
</script>

<style lang="scss" scoped>
   
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    
    img{
        height: 60px;
        width: 60px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
       border: none; 
    }

</style>
