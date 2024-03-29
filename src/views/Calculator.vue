<template>
  <div class="calculator-view">
    <div id="loader" ref="loader"></div>
    <section id="inputForms">
      <div id="inputFormProp">
        <h2>Find if a proposition is satisfiable, tautology, contradiction and draw truth table</h2>
        <form @submit.prevent="propSubmitted()">
          <input
            v-model="searchProp"
            class="max-width"
            name="searchProp"
            id="searchProp"
            type="text"
            placeholder="Enter Proposition"
          />
          <button class="btn-calc" type="submit" :disabled="isDisabled">calculate</button>
        </form>
      </div>
      <div id="inputFormLaw">
        <h2>Apply law to proposition</h2>
        <form @submit.prevent="propLaw()">
          <input
            v-model="inputProp"
            class="max-width"
            name="inputProp"
            id="inputProp"
            type="text"
            placeholder="Enter Proposition"
          />
          <select v-model="selectedLaw" id="lawList">
            <option disabled value="">--select--</option>
            <option v-for="(law, index) in allLaws.Laws" :key="index">{{ law }}</option>
          </select>
          <button class="btn-calc" type="submit" :disabled="isDisabledLaw">calculate</button>
        </form>
      </div>
    </section>
    <section v-if="!errorFetching && !loading && !initial" id="allResults">
      <div id="topResults">
        <div v-for="(resData, resName) in topRes" :key="resName" id="topResult">
          <strong>{{ resName }}: </strong>
          <span :class="{ resDataT: resData === true, resDataF: resData === false }">{{ resData }} </span>
        </div>
      </div>
      <table v-if="showTable && tableRes.Interpretations.length > 0" class="max-width">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="variable in tableRes.Variables" :key="variable">{{ variable }}</th>
            <th>{{ tableRes.Proposition }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(interpretation, row) in tableRes.Interpretations" :key="row">
            <td>{{ row + 1 }}</td>
            <td
              v-for="(bool, i) in interpretation"
              :key="i"
              :class="{ resDataT: bool === true, resDataF: bool === false }"
            >
              {{ bool }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import API from "@/API";
const tableData = ["Interpretations", "Proposition", "Variables"];
export default {
  data() {
    return {
      searchProp: "",
      inputProp: "",
      selectedLaw: "",
      loading: false,
      errorFetching: false,
      showTable: false,
      initial: true,
      tableRes: [],
      topRes: [],
      allLaws: [],
    };
  },
  computed: {
    isDisabled() {
      return this.searchProp.length === 0;
    },
    isDisabledLaw() {
      return this.inputProp.length === 0 || this.selectedLaw === "";
    },
  },
  created() {
    API.laws().then((allLaws) => {
      this.allLaws = allLaws;
    });
  },
  methods: {
    filteredResults(res, keys) {
      let newObject = {};
      keys.forEach(function(key) {
        newObject[key] = res[key];
      });
      return newObject;
    },
    propSubmitted() {
      this.$refs.loader.classList.add("waiting");
      this.loading = true;
      this.errorFetching = false;
      this.showTable = false;
      API.calcProp(this.searchProp).then((results) => {
        if (results instanceof Error) {
          this.errorFetching = true;
          alert(results.response.Error);
        } else {
          this.tableRes = this.filteredResults(results, tableData);
          this.topRes = this.filteredResults(
            results,
            Object.keys(results).filter((k) => !tableData.includes(k))
          );
          this.showTable = true;
        }
        this.initial = false;
        this.loading = false;
        this.$refs.loader.classList.remove("waiting");
      });
    },
    propLaw() {
      this.$refs.loader.classList.add("waiting");
      this.loading = true;
      this.errorFetching = false;
      this.showTable = false;
      API.partial(this.inputProp, this.selectedLaw).then((results) => {
        if (results instanceof Error) {
          this.errorFetching = true;
          alert(results.response.Error);
        }
        this.initial = false;
        this.topRes = results;
        this.loading = false;
        this.$refs.loader.classList.remove("waiting");
      });
    },
  },
};
</script>

<style>
.calculator-view {
  margin: 1em auto;
  width: 85vw;
}
.calculator-view form {
  display: flex;
  margin: 0;
}
.calculator-view td,
.calculator-view th {
  text-align: center;
  border: 1px solid gray;
  height: 2em;
}
.calculator-view table {
  margin-top: 0.5em;
  border-collapse: collapse;
}
.calculator-view h2 {
  font-size: 1.2rem;
  margin: 0 0 0.5em 0;
}
.calculator-view #inputForms {
  background-color: var(--bg);
  box-shadow: var(--shadow2dp);
  padding: 1rem;
  margin: auto auto 2em auto;
  border-radius: 5px;
}
.calculator-view #inputFormProp {
  margin-bottom: 2em;
}
.calculator-view form input {
  padding: 0.5rem;
}
.calculator-view #topResults {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 1.1rem;
}
.calculator-view #searchProp {
  margin-right: 0.25em;
}
.calculator-view #lawList {
  margin: 0 0.25em;
}
.calculator-view #allResults {
  background-color: var(--bg);
  box-shadow: var(--shadow2dp);
  padding: 0.5rem;
  border-radius: 5px;
}
@media screen and (min-width: 1050px) {
  .calculator-view #inputForms {
    width: 65vw;
  }
}
</style>
