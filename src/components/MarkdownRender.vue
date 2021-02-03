/* eslint-disable */
<template>
  <!-- eslint-disable vue/valid-v-html -->
  <div
    ref="markdownUrl"
    class="markdown-body">
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

    // API call
    (async function fetchMarkdownText(){
      const r = await fetch(url);
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
      });
      const parsedText = await res.text();
      o.innerHTML = parsedText;
      // localStorage.setItem(`Rendered-Markdown`, parsedText); 
      /*  Set the Parsed text to local Storage to 
       *    avoid making multiple API Requests    */
      headingFilter();
    })();

    // Retrieve localStorage parsedText - for testing
    // const parsedText = localStorage.getItem(`Rendered-Markdown`);
    // o.innerHTML = parsedText;


    // Removing |== ==| 
    const headingFilter = () => {
      const subHeadings = document.querySelectorAll(`.markdown-body h2`);
      console.log(subHeadings);
      subHeadings.forEach(subHeading => {
        let c = subHeading.childNodes;
        subHeading.removeChild(c[4]);
        subHeading.removeChild(c[2]);
      });
    };

    // fetch(url).then(async r => {
    //   // actually set the parsed md
    //   const text = await r.text();
    //   const res = await fetch(`https://api.github.com/markdown`, {
    //     headers: {
    //       'Content-Type': `application/json`,
    //     },
    //     method: `POST`,
    //     body: JSON.stringify({
    //       accept: `application/vnd.github.v3+json`,
    //       mode: `markdown`,
    //       text,
    //     }),
    //   }).then(r => r.text());
    //   o.innerHTML = res;
    // },
    // );
  },
};

</script>

<style lang="scss" scoped>
  *{
    font-size: 2rem !important;
  }
</style>
<style lang="scss">
  .markdown-body h1 strong{
    color: var(--main-alpha);
  }
  .markdown-body h1{
    padding-bottom: 5rem;
  }
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
    padding: 45px 0;
      ul:first-of-type{
        padding: 2rem;
        li a{
          transition: all 0.2s ease;
        }
        li a:hover{
          color: var(--main-alpha);
        }
      }
	}

	@media (max-width: 767px) {
		.markdown-body {
      padding: 15px;
		}
  }
	@media (max-width: 1080px) {
		.markdown-body {
      padding: 20px;
		}
  }

  details{
    padding: 0.2rem 6rem;
  }
  details summary{
    background-color: rgba(0,0,0,0.2);
    margin: 0.2rem -6rem;
    padding: 0.2rem 2rem;
    border-radius: 1rem;
  }

  /* ul li ul li {
     padding: 2rem;
     font-size: medium; 
  } */
</style>
