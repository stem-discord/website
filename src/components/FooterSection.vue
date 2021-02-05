a<template>
  <footer>
    <div>
      <!-- i dont think its a good idea to inject simple stuff, 
      but lets try it -->
      <h1>{{ contact }}</h1>
      <p>{{ credits }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: `footer section`,
  props: {
    contact: String,
    credits: String,
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  padding: 5rem 10% 5rem 10%;
  background-color: var(--main-side-hover);
  color: var(--main-side-text);
}

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
</style>
