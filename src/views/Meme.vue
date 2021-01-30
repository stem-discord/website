<template>
  <div class="form-wrapper">
    <form class="meme-form">
      <h1>Meme Form</h1>
      <span class="meme-title-input">
        <input type="text" 
               name="meme-title"
               required />
        <label for="meme-title">Meme Title</label>
      </span>
      <input type="file"
             id="meme"
             name="meme"
             accept="image/png, image/jpeg" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
export default {
	
};
</script>

<style lang="scss" scoped>
*{
  font-size: 2rem;
}
</style>