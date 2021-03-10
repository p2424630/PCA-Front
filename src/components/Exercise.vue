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
      <p class="errorFetching" v-if="errorFetching">
        {{ results.response.Error }}
      </p>
      <p
        v-if="!loading && !errorFetching"
        :class="{ resDataT: results.Result === true, resDataF: results.Result === false }"
      >
        {{ results.Result_Prop }}
      </p>
    </form>
  </div>
</template>

<script>
import API from "@/API";
export default {
  props: {
    curExercise: {
      type: String,
      required: true,
    },
    eval_methods: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchProp: "",
      results: [],
      loading: false,
      errorFetching: false,
    };
  },
  methods: {
    checkProp() {
      this.results = [];
      this.loading = true;
      this.errorFetching = false;
      API.calcExercise(this.curExercise, this.eval_methods, this.searchProp).then((results) => {
        this.results = results;
        this.loading = false;
        if (results instanceof Error) {
          this.errorFetching = true;
        }
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
