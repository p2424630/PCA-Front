<template>
  <div class="cur-exercise">
    <div id="loader" ref="loader"></div>
    <form @submit.prevent="checkInput()">
      <span id="exerciseChar">{{ toChar(exerciseId) }})</span>
      <span id="prop" ref="prop">{{ curExercise }}</span>
      <input v-model="tProp" name="tProp" id="tProp" type="text" placeholder="Enter Proposition" />
      <button type="submit" :disabled="isDisabled">check</button>
      <span
        id="resultProp"
        ref="resultProp"
        v-if="!initial"
        :class="{ resDataT: results.Result === true, resDataF: results.Result === false }"
      >
        {{ results.Result_Prop }}
      </span>
    </form>
    <div
      id="menu"
      v-if="showMenu"
      :style="{
        left: `${left}px`,
        top: `${top}px`,
      }"
    >
      <span id="lawLink" v-for="(law, index) in allLaws.Laws" :key="index" @mousedown.prevent="applyLaw(law)">{{
        displayLaw(law)
      }}</span>
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
      left: 0,
      top: 0,
      showMenu: false,
      selectedText: "",
      allLaws: [],
      selection: "",
    };
  },
  computed: {
    isDisabled() {
      return this.tProp.length === 0;
    },
  },
  created() {
    API.laws().then((allLaws) => {
      this.allLaws = allLaws;
    });
  },
  mounted() {
    window.addEventListener("mouseup", (e) => {
      if (e.target === this.$refs.prop || e.target === this.$refs.resultProp) this.createMenu();
      else this.showMenu = false;
    });
  },
  methods: {
    checkInput() {
      this.loading = true;
      this.$refs.loader.classList.add("waiting");
      this.errorFetching = false;
      API.calcExercise(this.curExercise, this.eval_methods, this.tProp).then((results) => {
        if (results instanceof Error) {
          this.errorFetching = true;
          alert(results.response.Error);
        } else this.results = results;
        this.loading = false;
        this.$refs.loader.classList.remove("waiting");
        this.initial = false;
      });
    },
    createMenu() {
      this.selection = window.getSelection();
      const startNode = this.selection.getRangeAt(0).startContainer.parentNode;
      const endNode = this.selection.getRangeAt(0).endContainer.parentNode;
      if (!startNode.isSameNode(endNode)) {
        this.showMenu = false;
        return;
      }
      const { left, top, width } = this.selection.getRangeAt(0).getBoundingClientRect();
      if (!width) {
        this.showMenu = false;
        return;
      }
      this.top = top + window.scrollY - 10;
      this.left = left + width / 2;
      this.showMenu = true;
      this.selectedText = this.selection.toString();
    },
    applyLaw(law) {
      this.loading = true;
      this.$refs.loader.classList.add("waiting");
      this.errorFetching = false;
      API.partial(this.selectedText, law).then((results) => {
        if (results instanceof Error) {
          this.errorFetching = true;
          alert(results.response.Error);
        } else {
          const parentEl = this.selection.getRangeAt(0).commonAncestorContainer;
          parentEl.textContent = parentEl.textContent.replace(this.selectedText, results.Result);
        }
        this.loading = false;
        this.$refs.loader.classList.remove("waiting");
      });
    },
    toChar(number) {
      return String.fromCharCode(number + 97);
    },
    displayLaw(law) {
      return law.substring(0, 3);
    },
  },
};
</script>

<style>
.cur-exercise form {
  display: flex;
  padding: 0.5rem;
}
.cur-exercise p {
  padding: 0 1.5rem;
}
.cur-exercise input {
  margin-right: 0.25em;
}
.cur-exercise #exerciseChar {
  line-height: 35px;
  text-align: center;
}
.cur-exercise #prop,
.cur-exercise #resultProp {
  padding: 0.25rem 0.5rem;
  margin: 0.25em 0.5em;
  background-color: hsl(240, 20%, 80%);
}
.cur-exercise #menu {
  padding: 0.25rem 0.5rem;
  background: hsl(240, 20%, 20%);
  border-radius: 5px;
  display: flex;
  line-height: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -100%);
  transition: 0.5s all;
}
.cur-exercise #lawLink {
  color: white;
  cursor: pointer;
}
.cur-exercise #lawLink:hover {
  color: hsl(240, 30%, 80%);
}
.cur-exercise #lawLink:not(:first-child) {
  margin-left: 0.5em;
}
</style>
