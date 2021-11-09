// move to gocodeup / create own branch in https://github.com/gocodeup/ProjectPlatform
// refactor curriculum / edit markdown / display markdown ( --> create a pull request )
// as long as a PR was made from the the same branch to main , any changes that are committedm but aren't pushed will be added into that PR (will happen automatically until it's pushed)
// create pull request after updated content
// styling
// create select menu, to select which files to edit (instead of statically one.md like now)
// // --> use tree for structur of the project
// // // --> every time a directory and/or file is hit, make a request to that file


<template>
    <div class="curriculum-container">
        <section>
            <p>ORIGINAL MARKDOWN DISPLAYER</p>
             <markdown-displayer :markdownContent="originalMarkdown" />
        </section>
        <section>
            <p>MARKDOWN EDITOR</p>
        <markdown-editor  :markdownContent="originalMarkdown" @update-markdown="updateMd" />
        <Button @btn-click="handleUpdateContent()" text="save changes" />
        </section>
        <section>
            <p>UPDATED MARKDOWN DISPLAYER</p>
             <markdown-displayer :markdownContent="updatedMarkdown" />
        </section>

    </div>    

</template>

<script>
// import axios from 'axios';
// import Paragraph from "../components/Paragraph.vue"
import Button from "../components/Button.vue"
// import Success from "../pages/Success.vue";

// MARDOWN EDITOR/DISPLAYER
import MarkdownEditor from "../components/MarkdownEditor.vue"
import MarkdownDisplayer from "../components/MarkdownDisplayer.vue"

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.VUE_APP_GITHUB_API_KEY });

export default {
    name: 'Curriculum',
    components: {
        Button,
        MarkdownEditor,
        MarkdownDisplayer
    
    },
    data(){
        return {
            fileContentData: null,
            originalMarkdown: null,
            updatedMarkdown: null,
            latestSHA: null,
            randomData: 'hello this is random data.'
            
        }
    },    
    computed: {
        compiledHtml: function() {
        //   return this.input;
            return this.originalMarkdown;
        },

    },
    methods: {

        async fetchFileContents(){
            const fetchedFileData = await octokit.request('GET /repos/{owner}/{repo}/contents/js-1/{path}', {
            owner: 'SuitcaseCoder',
            repo: 'sample-content',
            path: 'one.md',
            ref: 'platform_updates'
            })
            return fetchedFileData;
        },
        // ---- MARKDOWN EDITOR & DISPLAYER
        updateMd(updatedMarkdown) { 
            console.log("updated md in updateMd: " , updatedMarkdown);
            this.updatedMarkdown = updatedMarkdown;
            console.log("updated md in state : " , this.updatedMarkdown);
     

        },
        // ------- PUT REQUEST TO UPDATE GITHUB
        async handleUpdateContent(){
            var today = new Date();            
            
            // updated content to replace existing content
            const updatedContent = this.updatedMarkdown + today;
            
            const updatedContentRes = await octokit.request('PUT /repos/{owner}/{repo}/contents/js-1/{path}', {
                owner: 'suitcaseCoder',
                repo: 'sample-content',
                path: 'one.md',
                message: 'message',
                content: window.btoa(updatedContent),
                sha: this.latestSHA,
                branch: 'platform_updates',
                accept: 'application/vnd.github.v3+json'
            })
            console.log('@handleUpdateContent: (response)', updatedContentRes.data);
            this.$router.push({name: 'success', path:'/success'});
            // return updatedContentRes
        }

    },
    async created (){
        const fetchedData = await this.fetchFileContents();
        this.fileContentData = fetchedData;




        console.log("data: ", this.fileContentData.data);

















        const currentFileMarkdown = window.atob(fetchedData.data.content);
        this.originalMarkdown = currentFileMarkdown;
        this.latestSHA = fetchedData.data.sha;

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


    section{
        padding: 30px 0;
        margin: 0 auto;
        width: 60%;
        /* background-color: lightgrey;
        border: 1px solid grey; */

    }
</style>