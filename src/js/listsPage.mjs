import {
    setLocalStorage,
    alertMessage,
    getLocalStorage,
    removeFromLocalStorage,
    renderTemplate
  } from "./utils.mjs";
  import { renderListWithTemplate } from "./utils.mjs";
  
  function listRecipeGenerator(recipe) {
    let html = `<li>
      <div class="horizontal-recipe-card">
          <img
          src="${recipe.image}"
          alt="Image for recipe"/>
          <div>
          <h2>${recipe.title}</h2>
              <p>${recipe.summary}</p>
              <br><br>
              <a class="button" href="../views/recipeListing.html?recipeId=${recipe.id}">View Recipe</a>
              <a href="#" class="delete-btn" data-recipe-id="${recipe.id}"><img class="x-btn" src="../images/x-btn.png"></a>`;

              html += getDropdown(recipe);
              
          html += `<div>
      <div>
    </li>`;
    return html;
  }

  function getDropdown(recipe) {
      let temp = localStorage.getItem('temp');
      if (temp == "Just Added Recipes") {
        return `<div class="add-List-Cont"><div class="dropdown-container addList"></div><button class="addList add-btn" data-recipe-id="${recipe.id}">Add To List</button><div>`;
      } else {
        return "";
      }
  }
  
  export default class listRecipeData {
    constructor(dataSource, listElement, key) {
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.key = key;
    }
  
    async init() {
        localStorage.setItem("temp", this.key);

        const listIds = getLocalStorage(this.key);

        
        document.querySelector("h2").innerHTML = this.key;

        let list = [];
        if (listIds === null) {
          this.listElement.innerHTML = `<div class="not-found"><h2>Currently no recipes. Return to search to find some ideas.</h2><div><a class="return-search" href="./recipeSearch.html">Click to return to search</a></div></div>`;
        } else {
          await Promise.all(
            listIds.map(async (id) => {
              const recipe = await this.dataSource.getRecipeById(id);
              list.push(recipe);
            })
          );}
        this.renderListRecipes(list);

        const deletebtnsNodeList = document.querySelectorAll(".delete-btn");
        const deletebtns = Array.from(deletebtnsNodeList);
        deletebtns.forEach((btn) => {
          console.log(btn);
          btn.addEventListener("click", () => {
            console.log("clicked");
            const recipeId = btn.dataset.recipeId;
            removeFromLocalStorage(this.key, recipeId);
            location.reload();
          });
        });

        // add dropdown options for each value in local storage
        if (this.key == "Just Added Recipes") {
        const dropdownContainersNodeList = document.querySelectorAll('.dropdown-container');
        const dropdownContainers = Array.from(dropdownContainersNodeList);
        const valuesTitles = getLocalStorage('listTitles');

        if (valuesTitles.length > 1) {
          dropdownContainers.forEach((container) => {
          const options = valuesTitles.map((title) => {
            if (title == "Just Added Recipes") {return};

            let titleValues = getLocalStorage(title);
            const recipeId = container.nextElementSibling.dataset.recipeId;
            if (titleValues && titleValues.includes(recipeId)) {
              return;
            } else {
              return `<option value="${title}">${title}</option>`;
            }
          }).join('');
          container.innerHTML = `<select>${options}</select>`;})}
          const dropdown = document.querySelector('.dropdown-container select');
          if (dropdown.options.length < 1) {
            document.querySelector('.add-List-Cont').classList.add("hide");
          } 
    }}
  
    renderListRecipes(list) {
      renderListWithTemplate(listRecipeGenerator, this.listElement, list);

      const addbtnsNodeList = document.querySelectorAll(".add-btn");
      if (addbtnsNodeList) {
        const addbtns = Array.from(addbtnsNodeList);
        addbtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const dropdownContainer = document.querySelector('.dropdown-container');
            const select = dropdownContainer.querySelector('select');
            const selectedValue = select.options[select.selectedIndex].value;

            const recipeId = btn.dataset.recipeId;
            setLocalStorage(selectedValue, recipeId);
            location.reload();

    });
  });
}
    }
  
  
  }