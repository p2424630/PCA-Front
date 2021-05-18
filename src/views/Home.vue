<template>
  <div class="home-view">
    <h1>Welcome to Propositional Calculus Application</h1>
    <div id="mainBody">
      <p id="topPar">
        Highlighting a proposition in the
        <router-link title="Go to Exercises" class="routerLink" to="/Exercises">Exercises</router-link> page will
        display a popup menu with propositional laws. <br />The law can then be applied to the selected portion of an
        expression and perform subexpression substitution.
      </p>
      <div id="allArticles">
        <article>
          <h3>Symbols:</h3>
          <div v-for="(symbolsList, type) in symbols" :key="type" id="accSymbols">
            <p>
              <b>{{ type }}:</b> {{ symbolsList }}
            </p>
          </div>
        </article>
        <article>
          <h3>Precedence:</h3>
          <div v-for="(prec, index) in precedence" :key="index" id="precLevels">
            <p>
              <b>{{ index + 1 }}.</b> {{ prec }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symbols: {
        VARIABLES: "Capital Letter/Word",
        TRUE: ["true", "top", "⊤"],
        FALSE: ["false", "bot", "⊥"],
        NEGATION: ["not", "¬", "!", "˜"],
        CONJUNCTION: ["and", "∧", "·"],
        DISJUNCTION: ["or", "∨", "∥"],
        IMPLICATION: ["implies", "⇒", "→"],
        EQUIVALENCE: ["iff", "⇔", "↔"],
      },
      precedence: ["( ) - TRUE - FALSE - VARIABLE", "AND", "OR", "IMPLICATION", "EQUIVALENCE"],
    };
  },
};
</script>

<style>
.home-view {
  width: 75vw;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-view #allArticles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home-view #allArticles p {
  margin-top: 0.5em;
}
.home-view #topPar a {
  color: var(--primary);
}
.home-view #allArticles article {
  margin: 1em 1em 0 0;
  padding: 0.5rem 1rem;
  background-color: var(--bg);
  border-radius: 5px;
  box-shadow: var(--shadow2dp);
}
</style>
