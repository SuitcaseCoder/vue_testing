<template>
    <div class="table_container" v-html="componentData.htmlString">
    </div>  
</template>

<script>
export default {
  name: "TableContent",
  props: {
    componentData: Object,
  }
};
</script>

<style scoped>
  .table_container >>> table {
  border-spacing: 0;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%),
    0 3px 1px -2px rgb(0 0 0 / 20%);
}
.table_container{
    margin: 16px 0;
}
.table_container >>> th {
  min-width: 10rem;
  background-color: rgba(0, 0, 0, 0.54);
  color: #fff;
  vertical-align: top;
}
/* code.hljs {
  background-color: transparent;
} */
.table_container >>> td {
  padding: 5px;
}
</style>