<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for=" item in goodslist " :to="'/home/goodsinfo/' + item.id " >
            <img :src=" item.img_url " alt="">
            <h1 class="title"{{ item.title }}</h1>
            <div class="info">
            <p class="price">
                <span class="now">￥{{ item.sell_price }}</span>
                <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{ item.stock_quantity }}件</span>
            </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button> -->
        <div class="goods-item" v-for=" item in goodslist " :key="item.id" @click="getDetail(item.id)">
            <img :src=" item.img_url " alt="">
            <h1 class="title"{{ item.title }}</h1>
            <div class="info">
            <p class="price">
                <span class="now">￥{{ item.sell_price }}</span>
                <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{ item.stock_quantity }}件</span>
            </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>


<script>



export default {
    data() {
        return {
            goodslist:[],
            id: this.$route.params.id,
            pageindex: 1
        }
    },
    created(){
        this.getgoodslist();
        
    },
    methods:{
        getgoodslist(){
            this.$http.get( 'api/getgoods?pageindex=' + this.pageindex ).then( result =>{
                if( result.body.status === 0 ){
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            } )
        },
        getmore(){
            this.pageindex ++;
            this.getgoodslist()
        },
        getDetail(id){
            //编程式导航
            /*1   this.$router.push( '/home/goodsinfo/' + id ); */
            /* 2  this.$router.push({ path: '/home/goodsinfo/' + id }) */
            this.$router.push({ name: 'goodsinfo', params: { id: id }})
        }
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    bottom: 0;
    
}
.goods-item{
    border: 1px solid #999;
    width: 49%;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
        width: 100%;
    }
    
}
.title{
    font-size: 14px;
}
.price{
    color: #8f8f94;
    .now{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .old{
        margin-left: 10px;
        text-decoration: line-through;
    }
}
.sell{
    display: flex;
    justify-content: space-between;
    } 
.info{
    p{
        margin: 0;
        padding: 5px;
    }
    background-color: #ddd;
    margin: 2px;
}
</style>
