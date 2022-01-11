<template>
  <section>
    <div class="container">
      <div v-if="question" class="card shadow">
        <h1>{{ question.content }}</h1>
        <p class="mb-0">
          Posted by:<span class="question-author">{{ question.author }}</span>
          on {{ question.created_at }}
        </p>
      </div>
      <div v-else class="">
        <h1 class="error text-center">404 - Question Not Found</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Question",
};
</script>
<script setup>
import { ref, onBeforeMount } from "vue";
import { axios } from "../common/api.service.js";
/*eslint-disable */
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});
/*eslint-enable */
let slug = ref(props.slug);
let question = ref({});

onBeforeMount(() => {
  getQuestionData();
});

async function getQuestionData() {
  const endpoint = `/api/v1/questions/${slug.value}/`;
  try {
    const response = await axios.get(endpoint);
    question.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
section {
  height: 88.5vh;
}
</style>
