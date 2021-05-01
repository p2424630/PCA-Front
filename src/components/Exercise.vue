<template>
  <div class="cur-exercise">
    <form @submit.prevent="checkInput()">
      <span id="exerciseChar">{{ toChar(exerciseId) }})</span>
      <span id="prop" ref="prop">{{ curExercise }}</span>
      <input
        @mouseup="sanitizeInput($event)"
        v-model="tProp"
        name="tProp"
        id="tProp"
        type="text"
        placeholder="Enter Proposition"
      />
      <button type="submit">verify</button>
      <strong v-if="loading"> Loading...</strong>
      <span id="errFetching" v-if="errorFetching">
        {{ results.response.Error }}
      </span>
      <span
        id="resultProp"
        ref="resultProp"
        v-if="!loading && !errorFetching && !initial"
        :class="{ resDataT: results.Result === true, resDataF: results.Result === false }"
      >
        {{ results.Result_Prop }}
      </span>
      <!-- <router-link :to="{ name: 'calculator', params: { prop: curExercise, methods: eval_methods } }"
        >Check</router-link
      > -->
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
      initial: true,
      errorFetching: false,
    };
  },
  mounted() {
    window.addEventListener("mouseup", (e) => {
      if (e.target === this.$refs.prop || e.target === this.$refs.resultProp) this.sanitizeInput();
    });
  },
  methods: {
    checkInput() {
      this.results = [];
      this.loading = true;
      this.errorFetching = false;
      API.calcExercise(this.curExercise, this.eval_methods, this.tProp).then((results) => {
        this.results = results;
        this.loading = false;
        this.initial = false;
        if (results instanceof Error) {
          this.errorFetching = true;
        }
      });
    },
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
    sanitizeInput(e) {
      if (e) {
        // Necessary for input values
        var selection = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
      } else {
        var selection = window.getSelection().toString();
      }
      console.log(selection);
      // if (this.validProp(selection)) {
      //   this.menuCreation(selection);
      // }
    },
    validProp(prop) {
      // var re =
      // return re.test(prop);
    },
    menuCreation(prop) {
      console.log(prop);
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
.cur-exercise #exerciseChar {
  line-height: 35px;
  text-align: center;
}
.cur-exercise #prop,
.cur-exercise #resultProp {
  padding: 0.25em;
  margin: 0.25em 0.5em;
  background-color: rgb(225, 225, 225);
}
</style>
