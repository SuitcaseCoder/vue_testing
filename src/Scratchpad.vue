<template>

            <a
      href="#"
      @click.prevent="
        downloadItem({
          url:
            'https://api.github.com/repos/suitcaseCoder/sample-content/contents/js-1/one.md',
          label: 'one-md.pdf',
        })
      "
    >
      download
    </a>
</template>

<script>
export default {
    name: 'Scratchpad',
        methods: {
            // download current curriculum
        async downloadItem({ url, label }) {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
    },
}
</script>