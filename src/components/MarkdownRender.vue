/* eslint-disable */
<template>
  <h1>the url is {{ url }}, content is {{ content }}</h1>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import { ref } from "vue";

const content = ref("");

fetch(/*fk this for now*/).then(r => r.text().then(t => (content.value = t)));

export default {
  setup() {
    const md = ref("");
    return {
      md,
      content
    };
  },
  name: "markdown renderer",
  props: {
    url: String
  }
};
</script>
