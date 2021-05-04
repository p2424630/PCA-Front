<template>
  <div class="home-view">
    <h1>Welcome to Propositional Calculus Application</h1>
    <div id="mainBody">
      <p id="topPar">
        Highlighting a proposition in the <router-link class="routerLink" to="/Exercises">Exercises</router-link> page
        will display a popup menu with propositional laws. <br />The law can then be applied to the selected portion of
        an expression and perform subexpression substitution.
      </p>
      <div id="allArticles">
        <article>
          <h3>Symbols:</h3>
          <div v-for="(symbolsList, type) in symbols" :key="type" id="accSymbols">
            <p>{{ type }}: {{ symbolsList }}</p>
          </div>
        </article>
        <article>
          <h3>Precedence:</h3>
          <div v-for="(prec, index) in precedence" :key="index" id="precLevels">
            <p>{{ index + 1 }}. {{ prec }}</p>
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
        CONJUNCTION: ["and", "∧", "·", "&"],
        DISJUNCTION: ["or", "∨", "+", "∥"],
        NEGATION: ["not", "¬", "!", "˜"],
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
  justify-content: center;
}
.home-view #allArticles h3,
.home-view #allArticles p {
  margin: 0;
}
.home-view #allArticles p {
  margin-top: 0.5em;
}
.home-view #allArticles article {
  margin: 1em;
  padding: 0.5rem 1rem;
  background-color: hsl(240, 20%, 80%);
}
</style>
