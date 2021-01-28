/* eslint-disable */
<template>
  <!-- eslint-disable vue/valid-v-html -->
  <div
    ref="markdownUrl"
    class="markdown-body">
    <slot/>
  </div>
</template>

<style>

  * {
    padding: 15px;
    font-size: medium;
  }

	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}

  strong {
    font-size: large !important;
  }

  ul li {
    font-style: italic;
  }

  ul li ul li /* wtf lmao */ {
     padding: 15px;
     font-size: medium; 
  }
</style>
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
