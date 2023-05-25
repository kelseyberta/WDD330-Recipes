import {
  setLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
} from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export function addToList(recipeid) {
  setLocalStorage("New Recipes", recipeid);
}

function titleCardGenerator(title) {
  let html = `<div class="list-card">
    <a href="../views/listsPage.html?listTitle=${title}">${title}</a>`;
    
    (title != "New Recipes") ? html += `<a href="#" class="delete-btn" data-title="${title}"><img src="../images/x-btn.png"></a>` : "";

  html += `</div>`;
  return html;
}

export default class personalRecipeData {
  constructor(dataSource, listElement, key) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.key = key;
    this.listsKey = "listTitles";
    this.listsElement = document.querySelector(".lists-titles");
  }

  async init() {
    if(!getLocalStorage(this.listsKey)) {
      setLocalStorage(this.listsKey, this.key);}

      const lists = getLocalStorage(this.listsKey);
      this.renderListsList(lists);

      const deletebtnsNodeList = document.querySelectorAll(".delete-btn");
      const deletebtns = Array.from(deletebtnsNodeList);
      deletebtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          let answer = await customConfirm();
          if (answer) {
            const title = btn.dataset.title;
            removeFromLocalStorage(this.listsKey, title);
            localStorage.removeItem(title);
            location.reload();
          }
        });
      });
    
    const addToListTitle = document.getElementById("add-list-name");
      addToListTitle.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          setLocalStorage(this.listsKey, addToListTitle.value);
          const lists = getLocalStorage(this.listsKey);
          this.renderListsList(lists, true);
          location.reload();
  }
});
  }

  renderListsList(list, clear = false) {
    renderListWithTemplate(titleCardGenerator, this.listElement, list, clear);
  }

}

function customConfirm() {
  return new Promise((resolve) => {
  var dialog = document.getElementById("custom-confirm");
  dialog.style.display = "block";

  var confirmYes = document.getElementById("confirm-yes");
  confirmYes.addEventListener("click", function() {
    dialog.style.display = "none";
    resolve(true);
  });

  var confirmNo = document.getElementById("confirm-no");
  confirmNo.addEventListener("click", function() {
    dialog.style.display = "none";
    resolve(false);
  });})
}