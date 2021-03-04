<template>
  <div class="memes-container">
    <h1>Memes</h1>
    <div class="meme-wrapper">
      <Meme 
        v-for="m in memes"
        :key="m._id"
        :url="m.url"
        :comments="m.comments"/>
    </div>
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
        // alert(`unable to connect to server. 
        // instead, have some random gifs :)`);
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
          {
            _id: 3,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 4,
            url: `https://tenor.com/view/elephant-running-gif-20266814`,
            comments: [],
          },
          {
            _id: 5,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 6,
            url: `https://tenor.com/view/elephant-running-gif-20266814`,
            comments: [],
          },
          {
            _id: 7,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 8,
            url: `https://tenor.com/view/elephant-running-gif-20266814`,
            comments: [],
          },
          {
            _id: 9,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 10,
            url: `https://tenor.com/view/elephant-running-gif-20266814`,
            comments: [],
          },
          {
            _id: 11,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 12,
            url: `https://tenor.com/view/elephant-running-gif-20266814`,
            comments: [],
          },
          {
            _id: 13,
            url: `https://tenor.com/view/ohayo-bye-wave-gif-13911439`,
            comments: [],
          },
          {
            _id: 14,
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
@import '../assets/_utils.scss';

.memes-container{
  @extend %center-div;
  margin: 1rem;
  padding: 1rem;
  flex-direction: column;
  position: relative;
  margin-bottom: 10rem;
  h1{
    align-self: flex-start;
    margin-bottom: 1rem;
    margin-left: 4rem;
  }
  .meme-wrapper{
    // this style is not a good idea but it will do for now
    // background-color: grey;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($meme-d, max-content));
    grid-gap: 4rem;
    justify-content: center;
  }
}

</style>