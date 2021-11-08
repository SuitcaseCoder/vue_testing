<template>
  <div class="code_snippet_container" @click="copyToClipboard">
    <p class="copy_tag">copy</p>
    <div class="code_snippet" v-html="componentData.htmlString"></div>
  </div>
</template>

<script>
export default {
  name: "CodeSnippet",
  props: {
    componentData: Object,
  },
  methods: {
    copyToClipboard() {
      console.log(this.componentData)
      navigator.clipboard.writeText(this.componentData.innerText);
    },
  },
};
</script>

<style scoped>
.copy_tag {
  z-index: 2;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  color: azure;
  margin: 3px 5px;
}
.copy_tag:hover {
  cursor: pointer;
  color: coral;
  transition: 0.25s;
}
.code_snippet {
}
.code_snippet_container {
  position: relative;
}
.code_snippet >>> .hljs-keyword {
  color: #cc7832;
}
.code_snippet >>> .hljs-meta {
  color: #bbb529;
}
.code_snippet >>> pre {
  background-color: #2b2b2b;
  padding: 5px;
  border-radius: 5px;
}
.code_snippet >>> .hljs-string {
  color: #6a8759;
}
.code_snippet >>> .hljs-class {
  color: #a9b7c6;
}
.code_snippet >>> .hljs-class > .hljs-title {
  color: #a9b7c6;
}
.code_snippet >>> .hljs-function {
  color: #a9b7c6;
}
.code_snippet >>> .hljs-function > .hljs-title {
  color: #ffc66d;
}
.code_snippet >>> code.hljs {
  color: #a9b7c6;
}
.code_snippet >>> code {
  padding: 1px 3px;
  background-color: hsla(0, 0%, 93%, 0.5);
}
.code_snippet >>> pre code {
  padding: 0;
  background-color: transparent;
}
</style>