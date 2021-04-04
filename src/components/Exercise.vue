<template>
  <div class="cur-exercise">
    <form @submit.prevent="checkInput()">
      <h6 id="propId">{{ toChar(exerciseId) }})</h6>
      <prop :curExercise="curExercise" />
      <input v-model="tProp" name="tProp" id="tProp" type="text" placeholder="Enter Proposition" />
      <button type="submit">verify</button>
      <strong v-if="loading"> Loading...</strong>
      <p class="errorFetching" v-if="errorFetching">
        {{ results.response.Error }}
      </p>
      <p
        v-if="!loading && !errorFetching"
        :class="{ resDataT: results.Result === true, resDataF: results.Result === false }"
      >
        {{ results.Result }}
      </p>
    </form>
  </div>
</template>

<script>
import API from "@/API";
import Prop from "@/components/Prop.vue";
export default {
  components: {
    Prop,
  },
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
  display: flex;
  margin: 0.5em 0 1em 2em;
}
.cur-exercise p {
  padding: 0 1.5em;
}
.cur-exercise input,
.cur-exercise button {
  margin: 0;
}
.cur-exercise h6 {
  margin-top: 5px;
  text-align: center;
}
</style>
