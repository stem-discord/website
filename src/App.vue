<template>
  <NavSection />
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
  <FooterSection contact="Contact Me"
                 credits="Owner nope#7777" />
</template>

<script>
import NavSection from "@/components/NavSection.vue";
import FooterSection from "@/components/FooterSection.vue";

export default {
  components: {
    NavSection,
    FooterSection,
  },
  create() {
    // add login code
    // add vuex (hopefully)
  },
};
</script>

<style lang="scss">
@import './assets/global.scss';
</style>
