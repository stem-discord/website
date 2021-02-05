<template>
  <MarkdownRender ref="md"
                  @updateTimestamp="updateTimestamp">
    https://raw.githubusercontent.com/stem-discord/public/main/STEM_Rules.md
  </MarkdownRender>
  <MarkdownRefresh @update="updateContent"
                   :last-updated="lastUpdated"/>
</template>

<script>
import MarkdownRender from "@/components/Markdown/Render.vue";
import MarkdownRefresh from "@/components/Markdown/RefreshButton.vue";
import { ref } from "vue";
import moment from "moment";


export default {
  components: {
    MarkdownRender,
    MarkdownRefresh,
  },
  methods: {
    updateContent() {
      // console.log(`trying to update content`);
      this.$refs.md.update();
    },
    updateTimestamp({ timestamp: { value } }) {
      this.lastUpdated = `${moment(value, `x`).calendar()}
      (${moment(value, `x`).fromNow()})`;
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
