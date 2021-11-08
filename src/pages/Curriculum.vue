<template>
    <div class="curriculum-container">
        <section>
            <p>BUTTON TO TRIGGER EDIT</p>
        <!-- <Response :content="this.download_url" /> -->
        <Button @btn-click="getRepoForEdit()" text="edit" />
        <article v-html="compiledHtml"></article>
        </section>
        <section>
            <p>MARKDOWN EDITOR</p>
        <!-- <markdown-editor  :markdownContent="markdown" @update-markdown="updateMd" /> -->
        </section>
        <section>
            <p>MARKDOWN DISPLAYER</p>
             <!-- <markdown-displayer :markdownContent="markdown" /> -->
        </section>

    </div>    

</template>

<script>
import axios from 'axios';
// import Paragraph from "../components/Paragraph.vue"
import Button from "../components/Button.vue"
// import Response from "../components/Response.vue"

// MARDOWN EDITOR/DISPLAYER
// import MarkdownEditor from "../components/MarkdownEditor.vue"
// import MardownDisplayer from "../components/MarkdownDisplayer.vue"

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.VUE_APP_GITHUB_API_KEY });

export default {
    name: 'Curriculum',
    components: {
        // Paragraph,
        Button,
        // Response,
        // MarkdownEditor,
        // MardownDisplayer
    
    },
    data(){
        return {
            getData: {},
            download_url: "",
            fileName: "",
            input: "",
            updatedContent: {},
            editSHA: "",
            // markdown: `# Hello World`,
            
        }
    },    
    computed: {
        compiledHtml: function() {
          return this.input;
        },

    }
      ,
    methods: {

        async fetchCurriculum(){
            const res = await octokit.request('GET /repos/{owner}/{repo}/contents/js-1/{path}', {
            owner: 'SuitcaseCoder',
            repo: 'sample-content',
            path: 'one.md',
            branch: 'platform_updates'
            })
            console.log(res);
            console.log("on page load, sha: ", res.data.sha);
            return res;
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

        async getRepoForEdit(){
            // get SHA + other info from branch we want to edit:
            // change to contentRes
            const res = await octokit.request('GET /repos/{owner}/{repo}/contents/js-1/{path}', {
                owner: 'SuitcaseCoder',
                repo: 'sample-content',
                path: 'one.md',
                branch: 'platform_updates',
                // ref must reference the correct branch which from you want the SHA to then make a PUT request to
                ref: 'platform_updates'
            })
            const sha = res.data.sha;
            console.log("res.data on get request platform branch: ", res.data);
            console.log("GET SHA FOR EDIT from platform_branch", sha)
            this.editSHA = sha;
            this.handlePutRequest(sha)

            // return res.data.sha;
        },

        // ---- MARKDOWN EDITOR & DISPLAYER
        // updateMd(updatedMarkdown) { 
        // this.markdown = updatedMarkdown;
        // },
        //     say(message) {
        // alert(message)
        // },

        // ------- PUT REQUEST TO UPDATE GITHUB
        async handlePutRequest(repoSHA){
            console.log("SHA on handlePutRequest:", repoSHA)
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
            // updated content to replace existing content
            const updatedContent = 
                "# last updated at: " + time + " \n ### Title \n ## sub title \n another sub title  \n new line over here some text blah blah blah blah \n ``` <h1> hello world </h1> ``` \n some more text over here blah blah oaisjekfjnifuanef"

            const res = await octokit.request('PUT /repos/{owner}/{repo}/contents/js-1/{path}', {
                owner: 'suitcaseCoder',
                repo: 'sample-content',
                path: 'one.md',
                message: 'message',
                content: window.btoa(updatedContent),
                sha: repoSHA,
                branch: 'platform_updates'
            })
            console.log('PUT REQUEST... response.data:', res.data);
            return res
        }

    },
    async created (){
        const data = await this.fetchCurriculum();
        // this.editSHA = await this.getRepoForEdit();
        this.data = data.data;
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