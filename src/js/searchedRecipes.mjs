import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { addToList } from "./userLists.mjs";

function searchedRecipeGenerator(recipe) {
  let html = `<li>
        <div class="list-recipe-card">
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <div>
          <h2>${recipe.title}</h2>
        <div>
        </a>
        <a href="#" class="save-btn`;

        let ids = getLocalStorage("Just Added Recipes");
        if (ids && ids.includes(recipe.id.toString())) {
          html += ` loved`;
        }
        html += `" data-recipe-id="${recipe.id}"></a></div>
        <div>
      </li>`
      return html;
}

export default class RecipeData {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // Get ingredients
    const ingredients = document.querySelector("#ingredients-input").value;

    // Get excluded ingredients
    const exludedIngredients = document.querySelector("#exclude-ingredients-input").value;

    // Get cuisines
    const cuisineCheckboxes = document.querySelectorAll('.cuisine input[type="checkbox"]');
    const selectedCuisines = [];
    for (let i = 0; i < cuisineCheckboxes.length; i++) {
      if (cuisineCheckboxes[i].checked) {
        selectedCuisines.push(cuisineCheckboxes[i].id);
      }
    }
    const cuisinesPipeSeparated = selectedCuisines.join('|');

    let list = await this.dataSource.findRecipeByAdvancedFilter(ingredients, cuisinesPipeSeparated, exludedIngredients);

    (list[0]) ? this.renderRecipes(list) : this.listElement.innerHTML = `<div class="not-found"><h2>No recipes found! Try again.</h2></div>`;
 
    const svbtnsNodeList = document.querySelectorAll(".save-btn");
    const svbtns = Array.from(svbtnsNodeList);
    const self = this;
    svbtns.forEach(btn =>
      btn.addEventListener("click", function () {
        const recipeId = this.dataset.recipeId;
        addToList(recipeId);
        self.renderRecipes(list);
      })
    );
  }

  renderRecipes(list) {
    renderListWithTemplate(searchedRecipeGenerator, this.listElement, list, true);
  }
}
