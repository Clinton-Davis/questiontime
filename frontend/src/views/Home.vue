<template>
  <div class="home">
    <div v-if="questions" class="container pt-4">
      <div v-for="q in questions" :key="q.uuid" class="">
        <div class="card shadow p-1 mb-3 bg-body rounded-15">
          <div class="card-body">
            <p>
              Posted by: <span class="question-author">{{ q.author }}</span>
            </p>
            <h2>
              <router-link
                :to="{ name: 'question', params: { slug: q.slug } }"
                class="question-link"
              >
                {{ q.content }}
              </router-link>
            </h2>

            <p class="mb-0">Answers: {{ q.answers_count }}</p>
          </div>
        </div>
      </div>
      <div class="my-4 d-grid gap-2 col-6 mx-auto w-25">
        <button
          v-if="!loading"
          @click="getQuestions"
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
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>
<script setup>
import { axios } from "../common/api.service.js";
import { ref, onBeforeMount } from "vue";
import { setPageTitle } from "../scripts/helpers";

let questions = ref([]);
let next = ref(null);
let loading = ref(false);

onBeforeMount(() => {
  getQuestions();
  setPageTitle("Question Time");
});

async function getQuestions() {
  let endpoint = "/api/v1/questions/";
  if (next.value) {
    console.log(next.value);
    endpoint = next.value;
  }
  loading.value = true;
  try {
    const response = await axios.get(endpoint);
    questions.value.push(...response.data.results);
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
.home {
  min-height: 88.5vh;
  height: fit-content;
  padding-bottom: 1rem;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
}
.question-link {
  font-weight: 500;
  color: black;
  text-decoration: none;
  text-transform: capitalize;
}
.question-link:hover,
.question-link:active {
  color: #160288;
  text-decoration: none;
}
.question-author {
  color: #5557ce;
  text-transform: capitalize;
  font-weight: 500;
}
.questin-author:hover,
.questin-author:active {
  color: #f79b07;
}
</style>
