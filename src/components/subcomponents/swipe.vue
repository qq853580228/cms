<template>
    <div>
        <mt-swipe :auto="4000" >
            <mt-swipe-item v-for="item in lunbotulist" :key="item.id" :class="{ 'full': isfull }">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>


<script>



export default {
    props:["lunbotulist","isfull"],
    data() {
        return {
            
        }
    },
    created(){
        
    },
    methods:{
        
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        text-align: center;
        img{
            height: 100%;
            
        }
    }

}    
.full{
    img{
        width: 100%;
    }
    
}
</style>
