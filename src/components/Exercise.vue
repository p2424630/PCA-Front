<template>
  <div class="cur-exercise">
    <form @submit.prevent="checkProp()">
      {{ curExercise }}
      <input
        v-model="searchProp"
        name="searchProp"
        id="searchProp"
        type="text"
        placeholder="Enter Proposition"
      />
      <button type="submit">check</button>
      <p
        v-if="!loading"
        :class="{ resDataT: results.Result === true, resDataF: results.Result === false }"
      >
        {{ results.Proposition }}
      </p>
    </form>
  </div>
</template>

<script>
import API from "@/API";
export default {
  props: {
    curExercise: String,
    eval_method: String,
  },
  data() {
    return {
      searchProp: "",
      results: [],
      loading: false,
    };
  },
  methods: {
    checkProp() {
      this.results = [];
      this.loading = true;
      API.calcExercise(this.curExercise, this.eval_method, this.searchProp).then((results) => {
        this.results = results;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
.cur-exercise form {
  margin: 0.5em 0 1em 2em;
}
.cur-exercise p {
  display: inline;
  padding: 0 1em;
}
.cur-exercise input,
.cur-exercise button {
  margin: 0;
}
</style>
