export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeFromLocalStorage(key, data) {
  const listsList = (() => {
    const itemData = localStorage.getItem(key);
    return itemData === null ? [] : JSON.parse(itemData);
  })();

  const updatedList = listsList.filter(e => e !== data);
  localStorage.setItem(key, JSON.stringify(updatedList));
}

export function setLocalStorage(key, data) {

    const listsList = (() => {
      const itemData = localStorage.getItem(key);
      return itemData === null ? []
      : JSON.parse(itemData);
    })();
  
    if (listsList.some(e => e === data)) {
      alertMessage("Already saved!");
      return;
    } else {
      listsList.push(data);
    }
  
  
      localStorage.setItem(key, JSON.stringify(listsList));
      alertMessage("Added to saved!");
  }


export function renderTemplate(template, parentElement, data, callback, location = "afterbegin") {
  parentElement.insertAdjacentHTML(location, template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headTemplate = await loadTemplate("src/partials/head.html");
  const headElement = document.querySelector("#dynamic-head");
  const headerTemplate = await loadTemplate("src/partials/header.html");
  const headerElement = document.querySelector("#dynamic-header");
  const footerTemplate = await loadTemplate("src/partials/footer.html");
  const footerElement = document.querySelector("#dynamic-footer");

  renderTemplate(headTemplate, headElement);
  renderTemplate(headerTemplate, headerElement);
  renderTemplate(footerTemplate, footerElement);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  clear = false,
  position = "afterbegin"
) {
  list = Object.values(list);
  const htmlStrings = list.map((item) => templateFn(item));
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const recipe = urlParams.get(param);
  return recipe;
}

export function alertMessage(message, scroll = true, duration = 2000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p>`;

  const main = document.querySelector("main");
  main.prepend(alert);

  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}