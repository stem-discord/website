<template>
  <div class="form-wrapper">
    <form @submit.prevent
          class="meme-form"
          ref="form">
      <h1>{{ sendingMeme ? "Uploading..." : "Meme Form" }}</h1>
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
      <button @click="sendMeme()">Send</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import fetch from 'node-fetch';
import router from '../router';
import { sleep } from '../asyncUtils';

const sendingMeme = ref(false);
const form = ref(null);

export default {
  setup() {
    async function sendMeme() {
      if (!form.value) return;
      sendingMeme.value = true;
      console.log(form.value)
      console.log(window.location.href)
      const fd = new FormData(form.value);
      const responseData = await fetch(window.location.href, {
        method: 'POST',
        body: fd,
        headers: {
          // adding this doesnt work
          // 'Content-Type': 'multipart/form-data'
        }
      }).catch(console.error)

      console.log(responseData)
    }
    return {
      sendMeme,
      sendingMeme,
    };
  },
  mounted() {
    form.value = this.$refs.form;
  }
};
</script>

<style lang="scss" scoped>
*{
  font-size: 2rem;
}
</style>
<style lang="scss">
  // form styles
  .form-wrapper{
    width: 100%;
    margin: 2rem 0;
    display: flex;
    align-content: center;
    justify-content: center;
    .meme-form h1{
      font-size: 3rem;
    }
  }
  .meme-form{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    padding: 2rem;
    background: #00000000;
    border-radius: 2rem;
    box-shadow: 0 0 2rem #00000041;
  }
  .meme-title-input{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0;
    width: 100%;
  }
  .meme-title-input input{
    width: 100%;
    padding: 0.8rem;
    background: none;
    border-bottom: solid 2px #613a94a1;
    margin-bottom: 1rem;
  }
  .meme-title-input label{
    position: absolute;
    margin-left: 1.2rem;
    transition: all 0.4s ease;
  }
  .meme-title-input input:valid ~ label, .meme-title-input input:focus ~ label{
    font-size: 1.2rem;
    transform: translate(-0.2rem, -3rem);
    color: rgb(116, 116, 116);
  }
  .meme-title-input input:focus{
    border-bottom: solid 2px var(--main-alpha);
  }
  .meme-form button{
    padding: 0.6rem;
    margin: 2.6rem 0 0.2rem 0;
    border-radius: 0.4rem;
    color: white;
    background-color: var(--main-alpha);
    cursor: pointer;
    transition: all 0.4s ease;
  }
  .meme-form button:hover{
    box-shadow: 0 0 1rem #00000041;
  }
</style>