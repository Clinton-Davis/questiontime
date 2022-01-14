<template>
  <section>
    <div class="container">
      <div v-if="question" class="card shadow p-1 mt-3 bg-body rounded-15">
        <div class="card-body">
          <h2 class="mb-3">
            {{ question.content }}
          </h2>
          <p class="mb-0">
            Posted by:
            <span class="question-author">{{ question.author }}</span>
          </p>
          <p class="mt-0 mb-0">
            {{ question.created_at }}
          </p>
          <div v-if="userHasAnswered" class="mt-3">
            <p class="mb-0 answer-added">You've answered this question.</p>
          </div>
          <div v-else-if="showForm" class="mt-3">
            <form @submit.prevent="onSubmit">
              <textarea
                class="form-control"
                placeholder="Write your answer in here"
                rows="10"
                v-model="newAnswerBody"
              ></textarea>
              <button class="mt-3 btn btn-warning shadow" type="submit">
                Submit
              </button>
            </form>
            <p v-if="error" class="error my-2">{{ error }}</p>
          </div>
          <div v-else class="mt-3">
            <button @click="showForm = true" class="btn btn-warning shadow">
              Answer Question
            </button>
          </div>
        </div>
      </div>
      <div v-else class="">
        <div class="card-body">
          <h1 class="error text-center notFound">404 - Not Found</h1>
        </div>
      </div>
      <!-- <hr /> -->
      <div v-if="question" class="my-1">
        <AnswerComp
          v-for="answer in answers"
          :key="answer.uuid"
          :answer="answer"
        />
      </div>
      <div class="my-4 d-grid gap-2 col-6 mx-auto w-25">
        <button
          v-if="!loading"
          @click="getQuestionsAnswers"
          v-show="next"
          class="btn btn-primary shadow"
        >
          Load More
        </button>
        <button v-else class="btn btn-primary" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm shadow"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
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
import AnswerComp from "../components/AnswerComp.vue";

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
let userHasAnswered = ref(false);
let showForm = ref(false);
let newAnswerBody = ref(null);
let error = ref(null);

onBeforeMount(() => {
  getQuestionData();
  getQuestionsAnswers();
});

async function getQuestionData() {
  const endpoint = `/api/v1/questions/${slug.value}/`;
  try {
    const response = await axios.get(endpoint);
    question.value = response.data;
    userHasAnswered.value = response.data.user_has_answered;
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

async function onSubmit() {
  if (!newAnswerBody.value) {
    error.value = "Answer can not be blank!";
    return;
  }

  const endpoint = `/api/v1/questions/${slug.value}/answer/`;
  try {
    const response = await axios.post(endpoint, {
      body: newAnswerBody.value,
    });
    answers.value.unshift(response.data);
    showForm.value = false;
    userHasAnswered.value = true;
  } catch (e) {
    console.error(e);
    const error = e;
  }
}
</script>

<style scoped>
section {
  min-height: 88.5vh;
  height: fit-content;
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
  animation-name: fadeIn;
  animation-duration: 5s;
}
.card {
  background-color: whitesmoke;
}

.answer-added {
  font-weight: bold;
  color: #c450c0;
}
</style>
