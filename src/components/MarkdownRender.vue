/* eslint-disable */
<template>
  <!-- eslint-disable vue/valid-v-html -->
  <div
    ref="markdownUrl">
    <slot/>
  </div>
</template>

<script>

export default {
  mounted() {
    // console.log(this.$refs);
    const o = this.$refs.markdownUrl;
    const url = o.textContent;
    o.textContent = `downloading...`;
    fetch(url).then(async r => {
      // actually set the parsed md
      const text = await r.text();
      const res = await fetch(`https://api.github.com/markdown`, {
        headers: {
          'Content-Type': `application/json`,
        },
        method: `POST`,
        body: JSON.stringify({
          accept: `application/vnd.github.v3+json`,
          mode: `markdown`,
          text,
        }),
      }).then(r => r.text());
      o.innerHTML = res;
    },
    );
  },
};

</script>
