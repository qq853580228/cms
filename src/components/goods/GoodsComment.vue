<template>
    <div>
        <comment :id="id"></comment>
    </div>
</template>


<script>
import goodscomment from '../subcomponents/comment.vue'


export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components:{
        'comment': goodscomment
    }
}
</script>

<style lang="scss" >



</style>
