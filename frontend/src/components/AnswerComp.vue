<template>
  <div class="card shadow p-3 rounded-15">
    <p class="bigerTest" style="white-space: pre-wrap">{{ answer.body }}</p>
    <p class="text-muted mb-0">
      <strong class="question-author">{{ answer.author }}</strong> &rarr;
      {{ answer.created_at }}
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

<style scoped>
.question-author {
  color: #5557ce;
  text-transform: capitalize;
  font-weight: 500;
}
.questin-author:hover,
.questin-author:active {
  color: #f79b07;
}
.bigerTest {
  font-size: 1.3rem;
}
</style>
