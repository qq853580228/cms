<template>
    <div>
        <h1 class="title">{{ descinfo.title }}</h1>
        <hr>
        <p class="content" v-html="descinfo.content "></p>
    </div>
</template>


<script>



export default {
    data() {
        return {
            descinfo:[],
            id: this.$route.params.id
        }
    },
    created(){
        this.getdesc();
    },
    methods:{
        getdesc(){
            this.$http.get( 'api/goods/getdesc/' + this.id ).then( result =>{
                if( result.body.status ===0 ){
                    this.descinfo = result.body.message[0];
                }
            } )
        }
    },  
    components:{
        
    }
}
</script>

<style lang="scss">
.title{
    font-size: 14px;
    color: #226aff;
    margin: 18px;
    text-align: center;
    padding: 0;
}
.content{
    
    img{
        width: 100%;
    }
}

</style>
