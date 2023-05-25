import { loadHeaderFooter } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import userListData from "./userLists.mjs";

loadHeaderFooter();

const dataSource = new SpoonacularConnection();
const element = document.querySelector(".lists-list");
const key = "Just Added Recipes";

const recipeList = new userListData(dataSource, element, key);
recipeList.init();
