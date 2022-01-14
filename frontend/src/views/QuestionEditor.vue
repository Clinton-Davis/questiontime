<template>
  <section>
    <div class="container">
      <div class="card shadow">
        <div class="card-body">
          <h1 class="mb-3">Ask a Question</h1>
          <form @submit.prevent="onSubmit">
            <textarea
              class="form-control"
              placeholder="What do you want to ask"
              maxlength="240"
              rows="5"
              v-model="questionBody"
            ></textarea>
            <p class="small text-muted mb-0">{{ chars }} of 240</p>
            <button class="mt-3 btn btn-warning shadow" type="submit">
              Publish
            </button>
            <p v-if="error" class="error my-2">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "question-editor",
};
</script>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { axios } from "../common/api.service.js";
import { setPageTitle } from "../scripts/helpers";
import { useRouter } from "vue-router";

const router = useRouter();
let questionBody = ref(null);
let error = ref(null);
let chars = ref(0);

onBeforeMount(() => {
  setPageTitle("Ask a Question");
});

watch(questionBody, () => {
  chars.value = questionBody.value.length;
  console.log(chars.value);
});

function onSubmit() {
  if (!questionBody.value) {
    error.value = "Hmm.. we are not clairvoyant! Try again";
  } else if (questionBody.value.length < 10) {
    error.value = "The question can not be less that 10 characters";
  } else if (questionBody.value.length > 240) {
    error.value = "You are over the 240 character limit.";
  } else {
    publishQuestion();
  }

  async function publishQuestion() {
    let endpoint = "/api/v1/questions/";
    let method = "POST";
    try {
      const response = await axios({
        method: method,
        url: endpoint,
        data: { content: questionBody.value },
      });
      router.push({
        name: "question",
        params: { slug: response.data.slug },
      });
    } catch (e) {
      console.error(e);
      const error = e.response.statusText;
    }
  }
}
</script>

<style scoped>
section {
  height: 88.5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  margin-top: -5rem;
}
</style>
