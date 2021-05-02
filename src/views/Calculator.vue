<template>
  <div class="calculator-view">
    <section class="inputForm">
      <h2>Calculate given proposition's satisfiable, tautology, contradiction and draw truth table</h2>
      <form @submit.prevent="propSubmitted()">
        <input
          v-model="searchProp"
          class="max-width"
          name="searchProp"
          id="searchProp"
          type="text"
          placeholder="Enter Proposition"
        />
        <button type="submit">calculate</button>
      </form>
    </section>
    <section class="inputForm">
      <h2>Apply laws to given proposition</h2>
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
          <option v-for="(law, index) in allLaws.Laws" :key="index">{{ law }}</option>
        </select>
        <button type="submit">calculate</button>
      </form>
    </section>
    <strong v-if="loading">Loading...</strong>
    <p id="errFetching" v-if="errorFetching">
      {{ results.response.Error }}
    </p>
    <section v-if="!loading && !errorFetching" class="max-width">
      <div v-for="(resData, resName) in results" :key="resName">
        <span v-if="resName !== 'Interpretations' && resName !== 'Variables' && resName !== 'Proposition'">
          <strong>{{ resName }}: </strong>
          <span :class="{ resDataT: resData === true, resDataF: resData === false }">{{ resData }} </span>
        </span>
      </div>
    </section>
    <section v-if="!errorFetching && showTable">
      <strong v-if="results.Variables.length === 0">Parsed: {{ results.Proposition }}</strong>
      <table v-else class="max-width">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="variable in results.Variables" :key="variable">{{ variable }}</th>
            <th>{{ results.Proposition }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(interpretation, row) in results.Interpretations" :key="row">
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
export default {
  data() {
    return {
      searchProp: "",
      inputProp: "",
      selectedLaw: "",
      loading: false,
      errorFetching: false,
      showTable: false,
      results: [],
      allLaws: [],
    };
  },
  created() {
    API.laws().then((allLaws) => {
      this.allLaws = allLaws;
    });
  },
  methods: {
    propSubmitted() {
      this.loading = true;
      this.errorFetching = false;
      this.showTable = false;
      this.results = [];
      API.calcProp(this.searchProp, "test").then((results) => {
        this.loading = false;
        this.results = results;
        this.showTable = true;
        if (results instanceof Error) {
          this.errorFetching = true;
        }
      });
    },
    propLaw() {
      this.loading = true;
      this.errorFetching = false;
      this.showTable = false;
      this.results = [];
      API.partial(this.inputProp, this.selectedLaw).then((results) => {
        this.loading = false;
        this.results = results;
        if (results instanceof Error) {
          this.errorFetching = true;
        }
      });
    },
  },
};
</script>

<style>
.calculator-view {
  margin: 2em auto auto auto;
  width: 85vw;
}
.calculator-view form {
  display: flex;
  margin: 0;
}
.calculator-view td,
.calculator-view th {
  font-size: 1.2rem;
  text-align: center;
}
.calculator-view h2 {
  font-size: 2rem;
  margin: 0 0 0.5em 0;
}
.calculator-view .inputForm {
  padding: 0.5em 0;
  /* outline-style: outset; */
}
</style>
