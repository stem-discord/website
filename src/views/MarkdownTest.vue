<template>
  <MarkdownRender ref="md"
                  @updateTimestamp="updateTimestamp">
    https://raw.githubusercontent.com/stem-discord/public/main/STEM_Rules.md
  </MarkdownRender>
  <button @click="updateContent" 
          id="refresh-button">Last updated: {{ lastUpdated }}</button>
</template>
// ? `| last update: ${lastUpdated} ago` : ""
<script>
import MarkdownRender from "@/components/MarkdownRender.vue";
import { ref } from "vue";
import moment from "moment";


export default {
  components: {
    MarkdownRender,
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
<style>
#refresh-button{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6rem;
  position: relative;
  display: block;
  max-width: 980px;
  min-width: 200px;
  background-color: rgba(0,0,0,0);
  color: var(--main-alpha);
  border-radius: 1rem;
  text-align: left;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.4s ease;
}
#refresh-button:hover{
  opacity: 1;
}
</style>