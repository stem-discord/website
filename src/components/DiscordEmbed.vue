<template>
  <iframe
    src="https://discord.com/widget?id=493173110799859713&theme=dark"
    width="100%"
    height="500"
    allowtransparency="true"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/>
</template>

<script>
export default {
  name: `discord widget`,
};
</script>

<style lang="scss" scoped>
iframe {
  // discord is mustarded and has this weird white corners. this important style remvoes that.
  background: transparent !important;
}
</style>
