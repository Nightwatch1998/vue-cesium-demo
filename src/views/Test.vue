<template>
    <imagery-demo></imagery-demo>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import ImageryDemo from '@/components/ImageryDemo'
    export default {
        name:'Test',
        components: {
            ImageryDemo
        },
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{})
        }
    }
</script>

<style lang='scss' scoped>

</style>