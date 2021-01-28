<template>
  <MarkdownRender
    url="https://raw.githubusercontent.com/stem-discord/public/main/STEM_Rules.md"
  />
</template>

<script>
import MarkdownRender from "@/components/MarkdownRender.vue";

export default {
  components: {
    MarkdownRender,
  },
};
</script>
