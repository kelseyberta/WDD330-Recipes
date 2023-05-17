export default class RecipeList {
    constructor(category, dataSource, listElement) {
      
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
      }
    renderList(list) {
      renderListWithTemplate(recipeCardTemplate, this.listElement, list);
}
}
function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(templateFn);
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }

function recipeCardTemplate(recipe) {
   return ``
  }