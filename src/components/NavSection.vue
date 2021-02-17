<template>
  <div class="top-nav">
    <img alt="STEM logo"
         src="../assets/logo.png"
         @click="goHome"
         id="goHomeLogo"/>

    <div>
      <h1>STEM Helpers & Students</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: `home nav`,
  methods: {
    goHome() {
      return this.$router.push(`/`);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-nav {
  background-color: var(--main-alpha);
  color: var(--main-alpha-text);
  height: var(--top-nav-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
}
img {
  padding: 2rem;
  height: 100%;
  width: auto;
  object-fit: contain;
  max-width: 100%;
}
#goHomeLogo {
  cursor: pointer
}
</style>
