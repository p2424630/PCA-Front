<template>
  <div class="cur-exercise">
    <form @submit.prevent="checkInput()">
      {{ toChar(exerciseId) }})
      <span id="exerciseProp"> {{ curExercise }} </span>

      <input v-model="tProp" name="tProp" id="tProp" type="text" placeholder="Enter Proposition" />
      <button type="submit">verify</button>
      <p class="errorFetching" v-if="errorFetching">
        {{ results.response.Error }}
      </p>
      <strong v-if="loading"> Loading...</strong>
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
    exerciseId: {
      type: Number,
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
    checkInput() {
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
    toChar(number) {
      return String.fromCharCode(number + 97);
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
.cur-exercise #exerciseProp {
  background-color: lightgray;
  padding: 0.25em;
  margin: 0 0.5em;
}
</style>
