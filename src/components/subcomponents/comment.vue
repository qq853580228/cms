<template>
    <div class="cmt-container">
        <h1 class="title">发表评论</h1>
        <hr>
        <textarea name="" id="" cols="30" rows="4" maxlength="120" 
        placeholder="请输入评论内容（最多可输入120个字）" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomments">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for=" ( item, i ) in comments " :key=" item.add_time ">
                <div class="cmt-title">第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}}&nbsp;&nbsp;发表时间{{ item.add_time | dateFormat }}</div>
                <div class="cmt-content">{{ item.content === 'undefined' ? '此用户很懒，啥都没说' : item.content }}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>


<script>
import { Toast } from 'mint-ui'


export default {
    data() {
        return {
            comments:[],
            msg: '',
            pageindex: 1
        }
    },
    props:["id"],
    created(){
        this.getcomments();
    },
    methods:{
        getcomments(){
            this.$http.get( 'api/getcomments/' + this.id + '?pageindex=' + this.pageindex )
            .then( result =>{
                
                if( result.body.status === 0 ){
                    this.comments = this.comments.concat(result.body.message)
                }
            } );
        },
        getmore(){
            this.pageindex ++;
            this.getcomments();
        },
        postcomments(){
            if( this.msg.trim().length === 0 ){
                Toast('评论内容不能为空！');
            }
            else{this.$http.post( 'api/postcomment/' + this.id, { content: this.msg.trim() } ).then( result =>{
                if( result.body.status === 0 ){
                    var cmt = { user_name: '匿名用户', add_time: Date.now(), content: this.msg.trim() }
                    this.comments.unshift( cmt );
                    this.msg = '';
                }
            } )
            }
        }
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
.cmt-container{
    .title{
    font-size: 18px;
    
    }
    textarea{
        font-size: 14px;
        margin: 0;
    }   
}
.cmt-list{
    
    margin: 5px 0;
    .cmt-item{
        font-size: 13px;
    }
    .cmt-title{
    background-color: #ccc;
    line-height: 35px;
    
}
    .cmt-content{
    line-height: 35px;
    text-indent: 2em;
}  
}

</style>
