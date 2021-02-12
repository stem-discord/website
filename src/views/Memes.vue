<template>
  <div class="meme-wrapper">
    <Meme 
      v-for="m in memes"
      :key="m._id"
      :url="m.url"
      :comments="m.comments"/>
  </div>
</template>

<script>
import Meme from "@/components/SingleMemePanel";
import { ref } from "vue";


export default {
  components: {
    Meme,
  },
  mounted() {
    // the reference
    this.memes;
    // call memes api to the server
    (async () => {
      fetch(`/api/memes`, {
        headers: {
          'Content-Type': `application/json;`,
        },
        method: `GET`,
      }).then(async (r) => {
        const resJson = await r.json();
        this.memes = resJson;
      }).catch(() => {
        console.error(`unable to connect to api endpoint`);
        // TODO: actually fill this reponse as 
        // something that the user can know. for now, 
        // returning a mock data
        alert(`unable to connect to server. instead, have some random gifs :)`);
        this.memes = [
          {
            _id: 1,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 2,
            url: `https://tenor.com/view/elephant-running-gif-20266814`,
            comments: [],
          },
        ];
      });
    })();
  },
  setup() {
    let memes = ref([]);
    return {
      memes,
    };
  },

};
</script>

<style lang="scss">

.meme-wrapper {
  // this style is not a good idea but it will do for now
  margin: 40px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

</style>