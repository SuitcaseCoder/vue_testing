<template>
    <div class="paragraph_tag_container" v-html="componentData.htmlString">
    </div>  
</template>

<script>
export default {
  name: "ParagraphTagContent",
  props: {
    componentData: Object,
  }
};
</script>

<style scoped>
.paragraph_tag_container >>> code {
background-color: #b4b4b4;
    color: #000000;
    font-weight: bold;
    padding: 1px 3px;
    border-radius: 3px;
    font-family: monospace, monospace;
}
</style>