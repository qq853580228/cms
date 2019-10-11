<template>
    <div class="photos-container">
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class=" ['mui-control-item', item.id === 0 ? ' mui-active' : ''] " href="#item1mobile" 
                    data-wid="tab-top-subpage-1.html" v-for=" item in photoslist " :key="item.id" @tap="getphotoslistById( item.id )">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
    <ul class="photo-list">
        <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photosinfo/' + item.id ">
            <img v-lazy="item.img_url">
            <div class="info">
                <div class="info-title">{{ item.title }}</div>
                <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
        </router-link>
    </ul>
    </div>
</template>


<script>
import mui from '../../assets/js/mui.min.js'



export default {
    data() {
        return {
            photoslist:[],
            list:[]
        }
    },
    created(){
        this.getphotoslist();
        this.getphotoslistById(0);
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
	    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getphotoslist(){
            this.$http.get( 'api/getimgcategory' ).then( result =>{
                if( result.body.status ===0 ){
                    result.body.message.unshift({ title: '全部', id:0 });
                    this.photoslist = result.body.message;
                }
            } )
        },
        getphotoslistById(cateid){
            this.$http.get( 'api/getimages/' + cateid ).then( result =>{
                if( result.body.status ===0 ){
                    this.list = result.body.message;
                }
            } )
        }
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}
.photo-list{ 
    
    margin: 0;
    padding: 10px;
    list-style: none;
    padding-bottom: 0;
    img{
        width: 100%;
        vertical-align: middle;
    }
    img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
    }
    li{
        background-color: #ccc;
        text-align: center;
        box-shadow: -5px 0 8px #999 ;
        margin-bottom: 10px;
        position: relative;
    }
    .info{
        text-align: left;
        color: white;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        max-height: 84px;
        background-color:rgba(0, 0, 0, 0.4);
    }
}


</style>
