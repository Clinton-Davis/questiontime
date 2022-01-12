<template>
  <div class="">
    <p class="text-muted">
      <strong>{{ answer.author }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: "awnsers",
};
</script>
<script setup>
/*eslint-disable */
const props = defineProps({
  answer: {
    type: Object,
    required: true,
  },
});
/*eslint-enable */
</script>

<style></style>
