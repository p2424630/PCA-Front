<template>
  <div class="cur-exercise-prop">
    <div id="prop">
      {{ curExercise }}
    </div>
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
  },
  data() {
    return {
      tProp: "",
      results: [],
      loading: false,
      errorFetching: false,
    };
  },
  methods: {
    partialApplication() {
      this.results = [];
      this.loading = true;
      this.errorFetching = false;
      API.calcExercise(this.curExercise, this.eval_methods, this.tProp).then((results) => {
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
.cur-exercise-prop #prop {
  background-color: lightgray;
  padding: 0.25em;
  margin: 0.25em 0.5em;
}
</style>
