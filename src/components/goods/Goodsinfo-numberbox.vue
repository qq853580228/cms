<template>
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    
</template>


<script>
import mui from '../../assets/js/mui.min.js'


export default {
    props:["max"],
    data() {
        return {
            
        }
    },
    mounted(){
        mui(".mui-numbox").numbox();
        
        
    },
    methods:{
        countChange(){
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    watch:{
       'max':function( newVal, oldVal ){
            mui(".mui-numbox").numbox().setOption( 'max', newVal )
       }
    }
}
</script>

<style lang="scss" scoped>



</style>
