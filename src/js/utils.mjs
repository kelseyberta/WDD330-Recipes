export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function renderWithTemplate(template, parentElement, data, position = "afterbegin", callback) {
    parentElement.insertAdjacentHTML(position, template);
    if (callback) {
      callback(data);
    }
  }
  
async function loadTemplate(path) {
    const html = await fetch(path);
    const template = await html.text();
    return template;
  
  }

export async function loadHeaderFooter() {
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const headerTemplate = await loadTemplate("../partials/header.html");
    const header = document.querySelector("#dynamic-header");
    const footer = document.querySelector("#dynamic-footer");
  
    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
  }

export function getParams(param) {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recipe = urlParams.get(param);
return recipe;

}