<template>
  <div>
    <img src="img/logo.png" alt="logo" />
  </div>
  <div>
    <h1>STEM Heleprs & Students</h1>
  </div>
</template>

<script>
export default {
  name: "header",
  props: {
    msg: String
  }
};
</script>

<style lang="scss" scoped>
img {
  size: 10px;
}
</style>
