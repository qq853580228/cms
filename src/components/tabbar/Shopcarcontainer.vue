<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <div class="mui-card" v-for="( item, index ) in shopcartinfo" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch  v-model=" $store.getters.getgoodsSelected[item.id] " @change="selectedChanged( item.id, $store.getters.getgoodsSelected[item.id] )"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1 class="title">华为{{ item.title }}</h1>
                            <p><span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getshopcartcount[item.id]" :goodsid="item.id"></numbox>
                                <a href="" @click.prevent="remove( item.id, index )">删除</a>
                            </p>
                        </div>
                    </div>    
                </div>
            </div>
		</div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p class="selected">
                            已勾选商品&nbsp;<span class="number">{{ $store.getters.getgoodscountAndamount.count }}</span>&nbsp;件，总价&nbsp;<span class="number">￥{{ $store.getters.getgoodscountAndamount.amount }}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Numbox from '../subcomponents/shopcar-numbox.vue'
export default{
    props:["id"],
    data() {
        return {
            shopcartinfo:[],
            
        }
    },
    created(){
        this.getshopcartinfo();
    },
    methods:{
        getshopcartinfo(){
            var idArr = [];
            this.$store.state.cart.forEach( item => {idArr.push(item.id)} )
            if( idArr.length <= 0 ){
                return;
            }
            this.$http.get( 'api/goods/getshopcarlist/' + idArr.join(",") ).then( result =>{
                if( result.body.status === 0 ){
                    this.shopcartinfo = result.body.message;
                }
            } )
        },
        remove( id, index ){
            this.shopcartinfo.splice( index, 1 );
            this.$store.commit( "deletecartinfo", id );
        },
        selectedChanged( id, Val ){
            this.$store.commit( "updategoodsSelected", { id, selected: Val } )
            
        }
    },
    components:{
        'numbox': Numbox
    }
}
    
</script>
<style lang="scss" scoped>
.shopcart-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        img{
        height: 60px;
        width: 60px;
        }
    }
    .info{
        .price{
            font-size: 14px;
            color: red;
            font-weight: bold;
        }
        .title{
            font-size: 13px;
        }
        }
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
}
.jiesuan{
   .number{
    color: red;
    font-size: 14px;
    font-weight: bold;
    }
    display: flex;
    justify-content: space-between; 
}



</style>
