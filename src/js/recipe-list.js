import { loadHeaderFooter, getParams } from "./utils.mjs";
import RecipeList from "./RecipeList.mjs"
loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new RecipeList(category, dataSource, element);

listing.init();