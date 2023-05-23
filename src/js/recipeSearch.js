import { loadHeaderFooter } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import RecipeData from "./searchedRecipes.mjs";

loadHeaderFooter();

const dataSource = new SpoonacularConnection();
const element = document.querySelector(".searched-recipe-list");

function initializeRecipeData() {
  const recipe = new RecipeData(dataSource, element);
  recipe.init();
}

document
  .querySelector("#ingredients-input-button")
  .addEventListener("click", () => {
    initializeRecipeData();
  });
