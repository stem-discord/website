<template>
  <MarkdownRender ref="md"
                  @updateTimestamp="updateTimestamp">
    https://raw.githubusercontent.com/stem-discord/public/main/Server%20TOS.md
  </MarkdownRender>
  <MarkdownRefresh @update="updateContent"
                   :last-updated="lastUpdated"/>
</template>

<script>
import MarkdownRender from "@/components/Markdown/Render.vue";
import MarkdownRefresh from "@/components/Markdown/RefreshButton.vue";
import { ref } from "vue";
import moment from "moment";

// TODO: this is a copy of Rules.vue. it might be better to modularize this.
// can someone good at vue make a good implementation? 🤔
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
    updateTimestamp({ timestampString: { value } }) {
      this.lastUpdated = `${moment(String(value)).calendar()}
      (${moment(String(value)).fromNow()})`;
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
