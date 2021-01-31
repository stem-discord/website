<template>
  <div class="top-nav">
    <img alt="STEM logo"
         src="../assets/logo.png" />

    <div>
      <h1>STEM Helpers & Students</h1>
    </div>

    <button id="login">
      <div id="login-button">
        <img id="avatar" 
             src="../assets/avatar.png"/>
        <p>Log in</p>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: `home nav`,
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
#login-button {
  background-color: #fbe9e6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
}
#login {
  width: 200px;
  margin-left: auto;
  margin-right: 10px;
}
#login-button:hover {
  background-color: #e9b3e2;
  transition-duration: 250ms;
}
#avatar {
  border-radius: 50%;
  background-color: black;
  margin-right: 10px;
}
</style>
