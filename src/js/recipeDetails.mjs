import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { addToList } from "./userLists.mjs";

function singleRecipeGenerator(recipe) {
  let html = `
    <img
      src="${recipe.image}"
      alt="Image of"/>
      <div>
      <a href="#" class="addToListButton`;

        let ids = getLocalStorage("All Recipes");
        if (ids && ids.includes(recipe.id.toString())) {
          html += ` loved`;
        }
        html += `" data-recipe-id="${recipe.id}"><button>Add To List</button></a></div>
                <h2>${recipe.title}</h2>
                <a href="${recipe.sourceUrl}" target="_blank">Original Recipe</a>
                <p>Ready in: ${recipe.readyInMinutes} min</p>
                <p>${recipe.servings} servings</p>
                <h3>Ingredients:</h3>`;

        recipe.extendedIngredients.forEach((element) => {
          html += `<p>${element.original}</p>`;
        });

        html += `<h3>Instructions:</h3>`;
        if (recipe.analyzedInstructions[0]) {recipe.analyzedInstructions[0].steps.forEach((element, i) => {
          html += `<p>${i + 1}. ${element.step}</p>`;
        });} else {html += `<p>Oops! Check out the <a href="${recipe.sourceUrl}" target="_blank">site</a> for instructions.</p>`;}

        return html;
}

export default class RecipeData {
  constructor(dataSource, listElement, recipeId) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.recipeId = recipeId;
  }
  async init() {
    this.recipe = await this.dataSource.getRecipeById(this.recipeId);
    this.renderRecipeDetails(this.listElement);


    const addButton = document.querySelector(".addToListButton");
    addButton.addEventListener("click", () => {
      const recipeId = addButton.dataset.recipeId;
      addToList(recipeId);
      this.renderRecipeDetails(this.listElement);
    });

    
  }

  renderRecipeDetails(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = '';
    element.insertAdjacentHTML(
      "afterbegin",
      singleRecipeGenerator(this.recipe)
    );
  }

  renderRecipe() {
    renderListWithTemplate(
      singleRecipeGenerator,
      this.listElement,
      this.recipe
    );
  }
}
