# Propositional-Calculus-Application Front-End

This is a Website build to be used as an assisting tool for Propositional Calculus learning.
It consists of 2 main pages, [Exercises](https://github.com/p2424630/PCA-Front/blob/test/src/views/Exercises.vue) and [Calculator](https://github.com/p2424630/PCA-Front/blob/test/src/views/Calculator.vue), as well as the [Home](https://github.com/p2424630/PCA-Front/blob/test/src/views/Home.vue) page.

> Requires running the [Back-End](https://github.com/p2424630/PCA) API server on `port: 8085`.

---

## Setup

1. Have [nodejs](https://nodejs.org/en/) installed.
2. Run `npm install -g @vue/cli` to install the vue command line tool.
3. Navigate to `PCA-FRONT_DIRECTORY` and run `npm ci`. This will build the exact node_modules from the package-lock.
4. Run `npm run serve` to start the development build.

---

## Usage

### Exercises Page

When entering the Exercises page, all of the available exercises sections are generated from the back-end and displayed on the left. Selecting a section will then display all of the available exercises. Then the user can enter their answer and click the check button, this will make a call to the API with both propositions, generate the results and then compare them, displaying the correct result on the right either green if it's correct or red if false.

![alt text][exercises_1]

[exercises_1]: https://github.com/p2424630/PCA-Front/blob/test/images/exercises_example_1.png "pcabuilder image"

Another functionality in the exercises page is the subexpression substitution. When selecting a proposition either from the questions or the answers, a menu will be displayed with Laws.

![alt text][exercises_menu_1]

[exercises_menu_1]: https://github.com/p2424630/PCA-Front/blob/test/images/exercises_example_menu_1.png "pcabuilder image"

Selecting a Law will then replace the selected text with the equivalent proposition.

![alt text][exercises_menu_2]

[exercises_menu_2]: https://github.com/p2424630/PCA-Front/blob/test/images/exercises_example_menu_2.png "pcabuilder image"

### Calculator Page

The Calculator page has two forms, both have as input propositions, the first one will generate a truth table and display if the proposition is satisfiable, contradiction or a tautology.

![alt text][calculator_1]

[calculator_1]: https://github.com/p2424630/PCA-Front/blob/test/images/calculator_example_1.png "pcabuilder image"

The second form have as a second input a dropdown menu with all of the Laws currently implemented in the back-end. The user can enter a proposition and select a specific law to be applied.

![alt text][calculator_2]

[calculator_2]: https://github.com/p2424630/PCA-Front/blob/test/images/calculator_example_2.png "pcabuilder image"

---

## License

> More info can be found [here](https://github.com/p2424630/PCA-Front/blob/test/LICENSE)

The project is licenced under MIT.
