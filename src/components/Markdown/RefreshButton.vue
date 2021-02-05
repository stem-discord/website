<template>
  <button @click="refresh" 
          id="refresh-button">Last updated: {{ lastUpdated }}</button>
</template>

<script>
export default {
  methods: {
    refresh() {
      this.$emit(`update`);
    },
  },
  props: {
    lastUpdated: String,
  },
};
</script>


<style>
#refresh-button{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6rem;
  position: relative;
  display: block;
  max-width: 980px;
  min-width: 200px;
  background-color: rgba(0,0,0,0);
  color: var(--main-alpha);
  border-radius: 1rem;
  text-align: left;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.4s ease;
}
#refresh-button:hover{
  opacity: 1;
}
</style>