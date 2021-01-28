<template>
  <div class="home">
    <HelloWorld msg="Welcome to Thonk land" />
    <RP :text="'hii'" times="3" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import RP from "@/components/RepeatString.vue";

export default {
  name: `Home`,
  components: {
    HelloWorld,
    RP,
  },
};
</script>
