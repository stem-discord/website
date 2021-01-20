<template>
  hello {{ text }}
  <h1>{{ text.repeat(times) }}</h1>
</template>

<script>
export default {
  prop: {
    times: Number
  },
  props: ["text", "times"]
};
</script>
