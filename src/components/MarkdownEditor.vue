<template>
    <textarea :value="markdownContent" @input="handleMarkdownChange"></textarea>
</template>

<script>
export default {
  name: "MarkdownEditor",
  methods: {
    handleMarkdownChange(event) {
      this.$emit("update-markdown", event.target.value);
    },
  },
    props: {
    markdownContent: String,
  },
  emits: ["update-markdown"]
};
</script>

<style>
textarea {
  resize: none;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  padding: 0 0 0 5px;
  margin: 0;
}
</style>