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
      <button type="submit">VERIFY</button>
      <span
        id="resultProp"
        ref="resultProp"
        v-if="!loading && !errorFetching && !initial"
        :class="{ resDataT: results.Result === true, resDataF: results.Result === false }"
      >
        {{ results.Result_Prop }}
      </span>
      <strong v-if="loading">Loading...</strong>
    </form>
  </div>
  <div id="highlightable">
    <div
      class="tools"
      v-if="showTools"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
      }"
      @mousedown.prevent=""
    >
      <span class="item" v-for="(law, index) in allLaws.Laws" :key="index" @mousedown.prevent="handleAction(law)">{{
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
      x: 0,
      y: 0,
      showTools: false,
      selectedText: "",
      allLaws: [],
      subProp: "",
      selection: "",
    };
  },
  created() {
    API.laws().then((allLaws) => {
      this.allLaws = allLaws;
    });
  },
  mounted() {
    window.addEventListener("mouseup", (e) => {
      if (e.target === this.$refs.prop || e.target === this.$refs.resultProp) this.sanitizeInput();
      else this.showTools = false;
    });
  },
  methods: {
    checkInput() {
      this.results = [];
      this.loading = true;
      this.errorFetching = false;
      API.calcExercise(this.curExercise, this.eval_methods, this.tProp).then((results) => {
        if (results instanceof Error) {
          this.errorFetching = true;
          alert(results.response.Error);
        }
        this.results = results;
        this.loading = false;
        this.initial = false;
      });
    },
    sanitizeInput(e) {
      this.selection = window.getSelection();
      const startNode = this.selection.getRangeAt(0).startContainer.parentNode;
      const endNode = this.selection.getRangeAt(0).endContainer.parentNode;
      if (!startNode.isSameNode(endNode)) {
        this.showTools = false;
        return;
      }
      const { x, y, width } = this.selection.getRangeAt(0).getBoundingClientRect();
      if (!width) {
        this.showTools = false;
        return;
      }
      this.x = x + width / 2;
      this.y = y + window.scrollY - 10;
      this.showTools = true;
      if (e) this.selectedText = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
      else this.selectedText = this.selection.toString();
    },
    handleAction(action) {
      this.loading = true;
      this.errorFetching = false;
      API.partial(this.selectedText, action).then((results) => {
        if (results instanceof Error) {
          this.errorFetching = true;
          const err = results.response;
          if (results.response.Error) this.err = results.response.Error;
          alert(err);
        } else {
          this.$refs.prop.textContent = this.$refs.prop.textContent.replace(this.selectedText, results.Result);
        }
        this.subProp = results.Result;
        this.loading = false;
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
  padding: 0.25rem;
  margin: 0.25em 0.5em;
  background-color: hsl(240, 20%, 80%);
}
.tools {
  height: 30px;
  padding: 5px 10px;
  background: #333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tools:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}
.item {
  color: #fff;
  cursor: pointer;
}
.item path {
  fill: #fff;
}
.item:hover path {
  fill: #1199ff;
}
.item:hover {
  color: #1199ff;
}
.item + .item {
  margin-left: 10px;
}
</style>
