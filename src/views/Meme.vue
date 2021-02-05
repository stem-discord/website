<template>
  <div class="form-wrapper"
       :class="{ submitting: sendingMeme }">
    <div class="meme-form-error"
         v-if="errorMessage">
      <h2>{{ errorMessage }}</h2>
    </div>
    <form @submit.prevent
          class="meme-form"
          ref="form">
      <h1 style="opacity:100%;">
        {{ sendingMeme ? "Uploading..." : "Meme Form" }}
      </h1>
      <span>
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

const sendingMeme = ref(false);
const form = ref(null);
let errorMessage = ref();

export default {
  setup() {
    async function sendMeme() {
      if (!form.value) return;
      console.log("sending...")
      sendingMeme.value = true;
      const fd = new FormData(form.value);
      try {
        await fetch(window.location.href, {
          method: 'POST',
          body: fd,
          headers: {
            // adding this doesnt work
            // 'Content-Type': 'multipart/form-data'
          }
        }).then(async r => {
          const jbody = await r.json();
          console.log(jbody);
          if (r.status >= 400) {
            console.log("error");
            errorMessage.value = jbody.message;
          } else {
            console.log("success");
            alert("your meme has been submitted!");
            form.value.reset();
          }
        })
      } catch (e) {
        console.log(e)
        if (e.status === 500) {
          errorMessage.value = "internal server error"
        } else {
          errorMessage.value = e.statusText
        }
      } finally {
        sendingMeme.value = false;
      }
    }
    return {
      sendMeme,
      sendingMeme,
      errorMessage
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
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .meme-form-error, form{
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
      padding: 2rem;
      border-radius: 2rem;
      box-shadow: 0 0 2rem #00000041;
      width: 36rem;
      margin: 0 auto;
    }
    .meme-form-error{
      background-color: #ff6347;
      margin-bottom: 3rem;
      // display: none; (toggle between none and flex)
    }
    form{
      background: #00000000;

      h1{
        font-size: 3rem;
      }
      span{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 1rem 0;
        width: 100%;

        input{
          width: 100%;
          padding: 0.8rem;
          background: none;
          border-bottom: solid 2px #613a94a1;
          margin-bottom: 1rem;
        }
        label{
          position: absolute;
          margin-left: 1.2rem;
          transition: all 0.4s ease;
        }
        input:valid ~ label, input:focus ~ label{
          font-size: 1.2rem;
          transform: translate(-0.2rem, -3rem);
          color: rgb(116, 116, 116);
        }
        input:focus{
          border-bottom: solid 2px var(--main-alpha);
        }
      }
      button{
        padding: 0.6rem;
        margin: 2.6rem 0 0.2rem 0;
        border-radius: 0.4rem;
        color: white;
        background-color: var(--main-alpha);
        cursor: pointer;
        transition: all 0.4s ease;
      }
      button:hover{
        box-shadow: 0 0 1rem #00000041;
      }
      h2{
        display: none;
      }
    }
  }
  .submitting{
    position: relative;
    h1, span, input, button{
      opacity: 0;
      pointer-events: none;
    }
    h2{
      display: block !important;
      color: rgb(84, 84, 84);
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>