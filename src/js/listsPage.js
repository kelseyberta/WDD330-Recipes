import { loadHeaderFooter } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import listRecipeData from "./listsPage.mjs";
import { getParam } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new SpoonacularConnection();
const element = document.querySelector("#listsPageList");
const key = getParam("listTitle");

const recipeList = new listRecipeData(dataSource, element, key);
recipeList.init();
