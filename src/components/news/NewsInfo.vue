<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class='mui-ellipsis'>
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>浏览量： {{ newsinfo.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <comment-box :id="id"></comment-box>
    </div>
</template>


<script>
import comment from '../subcomponents/comment.vue'


export default {
    data() {
        return {
            id: this.$route.params.id,
            newsinfo:[]
        }
    },
    created(){
        this.getnewsinfo();
    },
    methods:{
        getnewsinfo(){
            this.$http.get( 'api/getnew/' + this.id ).then( result =>{
                if( result.body.status === 0 ){
                    this.newsinfo = result.body.message[0];
                }
            } )
        }
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;
}
.title{
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
}
.mui-ellipsis{
    font-size: 12px;
    color: cadetblue;
    display: flex;
    justify-content: space-between;
}
</style>
