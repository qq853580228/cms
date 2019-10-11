<template>
    <div class="goodsinfo">
        <transition 
        @before-enter="beforeEnter"
        @enter="Enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe :lunbotulist="lunbotulist" :isfull="false"></swipe>
                </div>
            </div>
		</div>
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span class="old">市场价：￥{{ goodsinfo.market_price }}</span>
                        <span class="new">销售价：￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox></p>
                    <mt-button  type="primary" size="small">立即购买</mt-button>
                    <mt-button  type="danger" size="small" @click="addToshopcart" :id="id" >加入购物车</mt-button>
                </div>
            </div>	
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button plain type="primary" size="large" @click="getDescinfo(id)" >图文介绍</mt-button>
                <br>
                <mt-button plain type="danger" size="large" @click="getgoodscomment(id)" >商品评论</mt-button>
            </div>
        </div>
    </div>   
</template>


<script>
import Swipe from '../subcomponents/swipe.vue'
import numbox from './Goodsinfo-numberbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotulist:[],
            goodsinfo:[],
            ballFlag: false,
            selectedCount:1
        }
    },
    created(){
        this.getgoodsinfo();
        this.getlunbotu();
    },
   mounted(){
       
   },
    methods:{
        getlunbotu(){
            this.$http.get( 'api/getthumimages/' + this.id ).then( result =>{
                if( result.body.status ===0 ){
                    result.body.message.forEach( item =>{
                        item.img = item.src
                    } )
                    this.lunbotulist = result.body.message;
                }
            } )
        },
        getgoodsinfo(){
            this.$http.get( 'api/goods/getinfo/' + this.id ).then( result =>{
                if( result.body.status === 0 ){
                    this.goodsinfo = result.body.message[0];
                }
            } )
        },
        getDescinfo(id){
            this.$router.push({ name: 'descinfo', params: { id: id } })
        },
        getgoodscomment(id){
            this.$router.push({ name: 'goodscomment', params: { id: id } })
        },
        addToshopcart(){
            this.ballFlag = !this.ballFlag;
            var Goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            }
            this.$store.commit('addTocart', Goodsinfo);
            
        },
        beforeEnter(el){
            el.style.transform = "translate( 0, 0 )";
        },
        Enter(el,done){
            el.offsetWidth;
            const ballposition = this.$refs.ball.getBoundingClientRect();
            const shopcartposition = document.getElementById('shopcart').getBoundingClientRect();
            const left =  shopcartposition.left - ballposition.left ;
            const top =  shopcartposition.top - ballposition.top ;
            el.style.transform = `translate( ${left}px, ${top}px )`;
            el.style.transition = " all 1s cubic-bezier(.4,-0.3,1,.68) ";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            this.selectedCount = count;  
        },
    },
    components:{
        'swipe': Swipe,
        'numberbox': numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo{
    background-color: #eee;
    overflow: hidden;
}
.mui-card-footer{
    display: block;
}
.price{
    .old{
        text-decoration: line-through;
        font-size: 14px;
    }
    .new{
        color: red;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
    }
}
.ball{
    border-radius:50%;
    width: 15px;
    height: 15px;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 408px;
    left: 147px;
}
</style>
