<template>
  <div class="">
    {{ slug }}
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
