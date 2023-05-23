import { loadHeaderFooter } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import RecipeData from "./recipeRandom.mjs";

loadHeaderFooter();

const dataSource = new SpoonacularConnection();
const element = document.querySelector(".recipes-main");

const recipe = new RecipeData(dataSource, element);
recipe.init();
