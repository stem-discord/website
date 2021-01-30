<template>
  <div class="form-wrapper">
    <div class="meme-form-error">
      <h2>You have an error...</h2>
    </div>
    <form>
      <h1>Meme Form</h1>
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
      <button>Send</button>
      <h2>Submitting...</h2>
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