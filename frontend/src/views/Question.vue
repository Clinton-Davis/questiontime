<template>
  <section>
    <div class="container">
      <div
        v-if="question"
        class="card bg-body shadow p-1 mt-3 bg-body rounded-15"
      >
        <div class="card-body">
          <h2 class="mb-3">
            {{ question.content }}
          </h2>
          <p class="mb-0">
            Posted by:
            <span class="question-author">{{ question.author }}</span>
          </p>
          <p class="mt-0">
            {{ question.created_at }}
          </p>
        </div>
      </div>
      <div v-else class="">
        <div class="card-body">
          <h1 class="error text-center notFound">404 - Not Found</h1>
        </div>
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
import { setPageTitle } from "../scripts/helpers";
/*eslint-disable */
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});
/*eslint-enable */
let slug = ref(props.slug);
let question = ref(null);
let answers = ref([]);
let next = ref(null);
let loading = ref(false);

onBeforeMount(() => {
  getQuestionData();
  getQuestionsAnswers();
});

async function getQuestionData() {
  const endpoint = `/api/v1/questions/${slug.value}/`;
  try {
    const response = await axios.get(endpoint);
    question.value = response.data;
    setPageTitle(response.data.content);
  } catch (error) {
    console.error(error);
    const title = "404 - Not Found!";
    setPageTitle(title);
  }
}
async function getQuestionsAnswers() {
  let endpoint = `/api/v1/questions/${slug.value}/answers/`;
  if (next.value) {
    console.log(next.value);
    endpoint = next.value;
  }
  loading.value = true;
  try {
    const response = await axios.get(endpoint);
    answers.value.push(...response.data.results);
    if (response.data.next) {
      next.value = response.data.next;
      loading.value = false;
    } else {
      next.value = null;
      loading.value = false;
    }
  } catch (error) {
    console.error(error.response);
  }
}
</script>

<style scoped>
section {
  height: 88.5vh;
}
.question-author {
  color: #5557ce;
  text-transform: capitalize;
  font-weight: 500;
  padding-left: 3px;
}
.questin-author:hover,
.questin-author:active {
  color: #f79b07;
}
.notFound {
  font-weight: bold;
}
.card {
  background-color: whitesmoke;
}
</style>
