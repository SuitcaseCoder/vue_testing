<template>
  <div
    class="code_content_holder"
    v-for="singleComponent in componentsList"
    :key="singleComponent.id"
  >
    <template v-if="singleComponent.type === 'pre'">
      <code-snippet :componentData="singleComponent" />
    </template>
    <template v-else-if="singleComponent.type === 'table'">
      <table-content :componentData="singleComponent" />
    </template>
        <template v-else-if="singleComponent.type === 'p'">
      <paragraph-tag-content :componentData="singleComponent" />
    </template>
    <template v-else>
      <div v-html="singleComponent.htmlString"></div>
    </template>
  </div>
</template>

<script>
import CodeSnippet from "./ContentComponents/CodeSnippet.vue";
import TableContent from "./ContentComponents/TableContent.vue";
import ParagraphTagContent from "./ContentComponents/ParagraphTagContent.vue";
var showdown = require("showdown"),
  showdownHighlight = require("showdown-highlight"),
  cheerio = require("cheerio"),
  converter = new showdown.Converter({
    tables: true,
    extensions: [showdownHighlight],
  });
export default {
  name: "MarkdownDisplayer",
  props: {
    markdownContent: String,
  },
  components: {
    CodeSnippet,
    TableContent,
    ParagraphTagContent,
  },
  computed: {
    componentsList() {
      return this.parseMarkdown(this.markdownContent);
    },
  },
  methods: {
    parseMarkdown(markdownToParse) {
      const parsedMD = `<div id='superuniqueboi'>${converter.makeHtml(
        markdownToParse
      )}</div>`;
      let $cherrio = cheerio.load(parsedMD);
      const compoentsObjs = $cherrio("#superuniqueboi")
        .children()
        .map(function (index, element) {
          const tmpHtml = $cherrio(element).toString();
        //   console.log($cherrio(element));
          const para = document.createElement(element.name);
          para.innerHTML = tmpHtml;
          return {
            htmlString: tmpHtml,
            innerText: para.innerText,
            type: element.name,
            id: `${index}_${element.name}`,
          };
        });
    //   console.log($cherrio($cherrio("#superuniqueboi")[0]));
      return compoentsObjs;
    },
    hanldeClick() {
      window.alert("You clicked a code snippet.");
    },
  },
};
</script>

<style scoped>
.code_content_holder {
  padding: 0 2%;
}
</style>