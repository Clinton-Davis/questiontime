<template>
  <div class="home">
    <div v-if="questions" class="container pt-4">
      <div v-for="q in questions" :key="q.id" class="">
        <div class="card shadow p-1 mb-3 bg-body rounded-15">
          <div class="card-body">
            <p>
              Posted by: <span class="questin-author">{{ q.author }}</span>
            </p>
            <h2>{{ q.content }}</h2>
            <p class="mb-0">Answers: {{ q.answers_count }}</p>
          </div>
        </div>
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
// import { capitalizeFirstLetter } from "../scripts/helpers.js";

let questions = ref([]);

onBeforeMount(() => {
  getQuestions();
});

async function getQuestions() {
  let endpoint = "/api/v1/questions/";
  try {
    const response = await axios.get(endpoint);
    return (questions.value = response.data);
  } catch (error) {
    console.error(error.response);
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
}
.questin-author {
  color: #5557ce;
  text-transform: capitalize;
  font-weight: 500;
}
.questin-author:hover,
.questin-author:active {
  color: #f79b07;
}
.rounded-15 {
  border-radius: 15px;
}
</style>
