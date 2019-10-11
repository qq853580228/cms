<template>
    <div class="photosinfo-container" >
        <h1 class="title">{{ photosinfo.title }}</h1>
        <p class="info">
            <span>发表时间：{{ photosinfo.add_time | dateFormat }}</span>
            <span>浏览量：{{ photosinfo.click }}</span>
        </p>  
        <hr>

        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>

        <div class="content" v-html="photosinfo.content">
        </div>
        <comment-box :id="id"></comment-box>
    </div>
</template>


<script>
import comment from '../subcomponents/comment.vue'


export default {
    data() {
        return {
            photosinfo:[],
            id: this.$route.params.id,
            list:[],
        }
    },
    created(){
        this.getphotosinfo();
        this.getsuoluotu();
    },
    methods:{
        getphotosinfo(){
            this.$http.get( 'api/getimageInfo/' + this.id ).then( result =>{
                if( result.body.status ===0 ){
                    this.photosinfo = result.body.message[0];
                }
            } )
        },
        getsuoluotu(){
            this.$http.get( 'api/getthumimages/' + this.id ).then( result =>{
                if( result.body.status ===0 ){
                    result.body.message.forEach( item =>{
                        item.w = 600;
                        item.h = 400;  
                        item.msrc = item.src;
                    } )
                    this.list = result.body.message;
                }

            } )
        }
    },
    components:{
        'comment-box': comment
    }
}
</script>

<style lang="scss" scoped>
.photosinfo-container{
    padding-left: 4px;
}
.title{
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.info{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.content{
    font-size: 13px;
    line-height: 30px;
}

</style>
