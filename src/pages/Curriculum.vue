<template>
    <div class="curriculum-container">
        <!-- <Response :content="this.download_url" /> -->
        <Button @btn-click="editContent(this.fileName)" text="edit" />
        <article v-html="compiledHtml"></article>

    </div>    

</template>

<script>
import axios from 'axios';
// import Paragraph from "../components/Paragraph.vue"
import Button from "../components/Button.vue"
// import Response from "../components/Response.vue"

export default {
    name: 'Curriculum',
    components: {
        // Paragraph,
        Button,
        // Response
    
    },
    data(){
        return {
            download_url: "",
            fileName: "",
            input: "",
            updatedContent: {},
            
        }
    },    computed: {
        compiledHtml: function() {
          return this.input;
        }
      },
    methods: {
        async fetchCurriculum(){
            console.log('fetched curriculum');
            const response = await axios.get(`api/repos/suitcaseCoder/sample-content/contents/js-1/one.md`)
            console.log(response);
            return response;
        },
        loadFile(){
                axios({
                method: "get",
                url: this.download_url
            })
                .then(result => {
                this.input = result.data;
                })
                .catch(error => {
                console.error("error getting file: " + error);
                });
            },
            async editContent(fileName){
                console.log("edit clicked");
                console.log("file name: " + fileName);
                const res = await fetch(`api/repos/suitcaseCoder/sample-content/contents/js-1/${fileName}`,
                {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    Accept: "application/vnd.github.v3+json",
                    "Access-Control-Allow-Origin": "null",
                    Authentication: `token ${process.env.GITHUB_TOKEN}`,
                    // "PRIVATE-TOKEN": `${GITHUB_TOKEN}`
                },
                credentials: "include",
                body: {
                    owner: "suitcasecoder",
                    repo: "sample-content",
                    path: "js-1/one.md",
                    sha: "5d68bcc8b81bd0fb8bc1eef86382cd065838ae9d",
                    message: "commit msg",
                    // creates Base64-encoded ASCII string from js string. necessary?
                    content: btoa("edited content"),
                },
                })
                const updated = await res.json();
                console.log(updated);
                this.updatedContent = updated;
            }
    },
    async created (){
        const data = await this.fetchCurriculum();
        this.download_url = data.data.download_url;
        this.fileName = data.data.name;
        this.loadFile();
    }
    
}
</script>

<style scoped>
    .content{
        margin: auto 0;
        border: 1px solid black;
        padding: 50px;
    }

    .curriculum-container{
        padding: 60px 0;
        margin: 0;
        
    }

    article{
        padding: 30px 0;
        margin: 0 auto;
        width: 60%;
        background-color: lightgrey;
        border: 1px solid grey;

    }
</style>