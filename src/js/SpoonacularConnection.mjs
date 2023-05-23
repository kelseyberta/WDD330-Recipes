const baseURL = "https://api.spoonacular.com/recipes";
const APIKey = "&apiKey=5330af71810943f4a6021269bbf25094";

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class SpoonacularConnection {
  constructor(category) {
  }

  async getRecipeById(id) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
  let data = await fetch(`${baseURL}/${id}/information?includeNutrition=false${APIKey}`, options).then(convertToJson);
  return data;
}

  async findRecipeByIngredients(ingredients) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let data = await fetch(`${baseURL}/findByIngredients?ingredients=${ingredients}&number=1${APIKey}`, options).then(convertToJson);
    return data;
  }

  async findRecipeByAdvancedFilter(ingredients, cuisine = false, excludeIngredients = false) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    let urlParams = new URLSearchParams();
    if (ingredients) urlParams.append("includeIngredients", ingredients);
    if (cuisine) urlParams.append("cuisine", cuisine);
    if (excludeIngredients) urlParams.append("excludeIngredients", excludeIngredients);

    let url = `${baseURL}/complexSearch?${urlParams.toString()}&number=15${APIKey}`;
    let data = await fetch(url, options).then(convertToJson);
    data = data.results;
    return data;
  }


  async getRandomRecipes() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let data = await fetch(`${baseURL}/random?limitLicense=true&number=1${APIKey}`, options).then(convertToJson);
    data = Object.values(data.recipes);
    return data;
  }

}