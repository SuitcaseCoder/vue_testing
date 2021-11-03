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
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.VUE_APP_GITHUB_API_KEY });

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
            // https://github.com/SuitcaseCoder/sample-content/blob/main/js-1/one.md
            // 'GET /repos/{owner}/{repo}/contents/{path}'
            const res = await octokit.request('GET /repos/{owner}/{repo}/contents/js-1/{path}', {
            owner: 'SuitcaseCoder',
            repo: 'sample-content',
            path: 'one.md',
            branch: 'platform_updates'

            })
            console.log(res);
            return res;
            // console.log('fetched curriculum');
            // const response = await axios.get(`api/repos/suitcaseCoder/sample-content/contents/js-1/one.md`)
            // console.log(response.data.url);
            // return response;
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
        async editContent(){
            const updatedContent = 
            "### Title \n ## sub title \n ## update number: 4 \n new line over here some text blah blah blah blah \n ``` <h1> hello world </h1> ``` \n some more text over here blah blah oaisjekfjnifuanef"
 
            console.log("edit clicked");
            // /repos/{owner}/{repo}/contents/js-1/{path}
            const res = await octokit.request('PUT /repos/{owner}/{repo}/contents/js-1/{path}', {
                owner: 'suitcaseCoder',
                repo: 'sample-content',
                path: 'one.md',
                message: 'message',
                content: window.btoa(updatedContent),
                sha: "fde6b903877d9f92713dcbba7ca5bbdec79d8cda",
                branch: 'platform_updates'
            })
            // const res = await octokit.request(`PUT  /repos/{owner}/{repo}/contents/js-1/{path}`, {
            //     headers: {
            //         Authorization: `token ${process.env.VUE_APP_GITHUB_API_KEY}`,
            //         accept: "application/vnd.github.v3+json"
            //     },
            //    data: {
            //         owner: 'suitcaseCoder',
            //         repo: 'sample-content',
            //         path: 'one.md',
            //         message: 'message',
            //         content: 'updated content'
            //     }
            // })  
            console.log(res);
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