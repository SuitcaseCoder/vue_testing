<template>
<!-- @click="onClick()" -->
    <button  @click="onClick()">{{text}}</button>
</template>

<script>
// import axios from 'axios';
export default {
    name: 'Button',
    props: {
        text: String
    },
    methods: {
        onClick(){
            this.$emit('btn-click')
        }
    // async created() {
    //     // get current path:
    //     const fullPath = this.$route.fullpath;
    //     // GET request using axios with async/await
    //     const response = await axios.get(`https://api.github.com/repos/suitcaseCoder/sample-content/${fullPath}`);
    //     const data = await response.json();
    //     console.log(data);
    // },
    
    //     getFullPath(){
    //         const fullPath = this.$route.fullpath;
    //         return fullPath
    //     }

    }

}
</script>

<style scoped>
    button{
        padding: 12px;
        background-color: rgb(32, 94, 32);
        color: white;
    }
</style>