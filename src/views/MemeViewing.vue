<template>
  <div v-for="meme in memes" 
       :key="meme">
    <div class="meme-image-wrapper">
      <img :src="meme.url"
           class="meme-image"/>
    </div>
    <div class="meme-info">
      <p class="meme-maker">{{ meme.ownerId }}</p>
      <p class="meme-date">{{ meme.comments[0].timestamp }}</p>
    </div>
    <div class="updownvote">
      <button class="upvote">
        &uarr;
      </button>
      <button class="downvote">
        &darr;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>
    div {
        height: 500px;
        background-color: red;
    }
</style>