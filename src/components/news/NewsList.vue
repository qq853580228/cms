<template>
    <div newslist-container>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for=" item in newslist " >
                <router-link :to=" '/home/newsinfo/' + item.id ">
                    <img class="mui-media-object mui-pull-left" :src=" item.img_url ">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ item.add_time | dateFormat }}</span>
                            <span>浏览量： {{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li >
		</ul>
    </div>
</template>


<script>



export default {
    data() {
        return {
            newslist:[]
        }
    },
    created(){
        this.getnewslist();
    },
    methods:{
        getnewslist(){
            this.$http.get( 'api/getnewslist' )
            .then( result =>{
                if( result.body.status ===0 ){
                    this.newslist = result.body.message;
                }
            } )
        }
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
li{
    h1{
        font-size: 14px;
    }
    p{
        font-size: 12px;
        color: cadetblue;
        display: flex;
        justify-content: space-between;
    }
}    
}


</style>
