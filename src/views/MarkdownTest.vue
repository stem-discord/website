<template>
  <button @click="updateContent">last updated: {{ lastUpdated }}</button>
  <MarkdownRender ref="md"
                  @updateTimestamp="updateTimestamp">
    https://raw.githubusercontent.com/stem-discord/public/main/STEM_Rules.md
  </MarkdownRender>
</template>
// ? `| last update: ${lastUpdated} ago` : ""
<script>
import MarkdownRender from "@/components/MarkdownRender.vue";
import { ref } from "vue";


export default {
  components: {
    MarkdownRender,
  },
  methods: {
    updateContent() {
      // console.log(`trying to update content`);
      this.$refs.md.update();
    },
    updateTimestamp({ timestampString }) {
      this.lastUpdated = timestampString.value;
    },
  },
  setup() {
    let lastUpdated = ref(`loading...`);
    return {
      lastUpdated,
    };
  },
  mounted() {
  },
};
</script>
