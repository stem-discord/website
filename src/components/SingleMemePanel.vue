// this should be a single meme with an upvote, downvote, and report button
<template>
  <div class="meme-panel">
    <ion-icon name="caret-up-outline"
              color="red"/>
    <ion-icon name="caret-down-outline"
              color="blue"/>
    <img src="https://cdn.discordapp.com/attachments/799954350477672458/809313781360230450/testing.png"
         alt="meme image"/>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    comments: Array,
  },
};
</script>

<style>
div.meme-panel {
  background-color: black;
}
</style>