let landonKey = "7e3f137972mshd515359a84b2ff9p113446jsn700b94e62ef7";
let megsKey = "c934e6b007msh76d8b17e732ba94p14495ejsndf11a0d68e49";
let rosaKey = "4bddcff26bmsh3341d016a17aa08p1a829ejsnf02400f6c0df";
let bellaKey = "72c9585311msh4f40ae66cddb063p1515bfjsnc61882058676";
let rafaelKey = "4373181a13mshb854ccce485fbcfp1ec2f2jsn4a150d9d81a6";

// // Array of everyones API keys

let keyArray = [landonKey, megsKey, rosaKey, bellaKey, rafaelKey];

// currentIndex declared outside of getNextKey to keep track of the current position in th array

let keyArrayIndex = 0;

// This function will will iterate through each of our API keys one by one every time the API is hit
// To use this function place getNextKey() in the 'X-RapidAPI-Key': field

function getNextKey() {
  let key = keyArray[keyArrayIndex];
  keyArrayIndex = (keyArrayIndex + 1) % keyArray.length;

  return key;
}

const inputEl = document.getElementById("user-input");
const badgesEl = document.getElementById("badges");
badgesEl.style = "display: flex";

//var allIngredients = [];
var ingredientsArray = [];

document.getElementById("add").addEventListener("click", function () {
  var userIngredient = inputEl.value;
  // ingredientsArray = JSON.parse(localStorage.getItem('ingredients'))

  if (ingredientsArray.length >= 3) {
    document.getElementById("warning").textContent = "up to 3!!";
  } else {
    ingredientsArray.push(userIngredient);
    //ingredientsArray.push(ingredient);

    localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));
  }

  loadIngredients();

  inputEl.value = "";
});
// loadIngredients();

document.getElementById("wand-btn").addEventListener("click", function () {
  // call api with all ingredients.
  event.preventDefault();
  fetchRecipe();
});

function loadIngredients() {
  console.log(ingredientsArray);
  if (localStorage.getItem("ingredients")) {
    ingredientsArray = JSON.parse(localStorage.getItem("ingredients"));
  }
  badgesEl.innerHTML = "";
  for (var i = 0; i < ingredientsArray.length; i++) {
    var divEl = document.createElement("div");
    var buttonEl = document.createElement("button");
    divEl.textContent = " " + ingredientsArray[i] + " ";
    divEl.style = "border: 1px solid gold; border-radius: 10px; padding: 3px 5px; margin: 5px";
    divEl.setAttribute("id", ingredientsArray[i]);
    buttonEl.innerHTML = "<span style='color:red'> X </span>";
    buttonEl.classList.add("delete");
    buttonEl.setAttribute("id", ingredientsArray[i]);
    buttonEl.setAttribute("data-text", ingredientsArray[i]);
    divEl.appendChild(buttonEl);
    badgesEl.appendChild(divEl);
  }
  var deleteEl = document.querySelectorAll(".delete");
  deleteEl.forEach((button) => {
    button.addEventListener("click", function () {
      var deleteIngredient = button.parentNode;
      deleteIngredient.remove();
      var existingArray = JSON.parse(localStorage.getItem("ingredients"));
      var ingredientIndex = existingArray.indexOf(`${button.id}`);
      if (ingredientIndex > -1) {
        existingArray.splice(ingredientIndex, 1);
      }
      localStorage.setItem("ingredients", JSON.stringify(existingArray));
      ingredientsArray = existingArray;
      console.log(button.id);
    });
  });
}
var scroll = document.querySelector('#recipes');

function fetchRecipe() {
  // ingredientsArray = JSON.parse(localStorage.getItem('ingredients'))
  const stringIngredients = ingredientsArray.join(",");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": getNextKey(),
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  console.log(stringIngredients);

  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" +
      stringIngredients +
      "&number=3&ignorePantry=true&ranking=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      recipeToPage(response);
      // render page using response variable
      scroll.scrollIntoView({ behavior: 'smooth' });
    })
    .catch((err) => console.error(err));
}

// This function displays 3 recipes on the DOM
function recipeToPage(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeDiv = $(`#recipe-${i + 1} .recipe-content`);
    recipeDiv.empty();

    const contentWrapper = $('<div></div>').addClass('flex flex-col items-center justify-center');

    const recipeName = $('<h2></h2>')
    .text(recipe.title)
    .css({ 'font-size': '1.3rem', 'font-weight': 'bold', 'word-wrap': 'break-word'});
    contentWrapper.append(recipeName);

    const recipeImage = $('<img></img>')
      .attr('src', recipe.image)
      .attr('alt', recipe.title)
      .addClass('recipe-image');
    contentWrapper.append(recipeImage);

    const usedIngredientsTitle = $('<h4></h4>')
    .text('Dream ingredients:')
    .css({ 'font-size': '1.1rem', 'font-weight': 'bold' });
    contentWrapper.append(usedIngredientsTitle);

    const usedIngredientsList = $('<ul></ul>');
    recipe.usedIngredients.forEach(ingredient => {
      let usedIngredientName = $('<li></li>').text(ingredient.name);
      usedIngredientsList.append(usedIngredientName);
    });
    contentWrapper.append(usedIngredientsList);

    const missedIngredientsTitle = $('<h4></h4>')
    .text('Additional ingredients:')
    .css({ 'font-size': '1.1rem', 'font-weight': 'bold' });
    contentWrapper.append(missedIngredientsTitle)

    const missedIngredientsList = $('<ul></ul>');
    recipe.missedIngredients.forEach(ingredient => {
      let missedIngredientName = $('<li></li>').text(ingredient.name);
      missedIngredientsList.append(missedIngredientName);
    });
    contentWrapper.append(missedIngredientsList);

  
    recipeDiv.append(contentWrapper);
  }
}


// This function displays random cocktail on DOM
const Drinkies = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": getNextKey(),
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

function getRandomCocktail() {
  fetch("https://thecocktaildb.p.rapidapi.com/random.php", Drinkies)
    .then((response) => response.json())
    .then((data) => displayCocktail(data.drinks[0]))
    .catch((error) => console.error("Error:", error));
}

// Used jquery for function below
// This function will makes sure that the DOM is fully loaded before the getRandomCocktail function can be called

$(document).ready(function () {
  $(".getRandomCocktail").click(getRandomCocktail);
  $("#closeModal").click(closeModal);
});

function displayCocktail(cocktail) {
  $("#cocktailName").text(cocktail.strDrink);
  $("#instructions").text(cocktail.strInstructions);

  const ingredientsList = $("#ingredientsList");
  ingredientsList.empty();
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      const li = $("<li></li>").text(`${ingredient} - ${measure}`);
      ingredientsList.append(li);
    }
  }

  $("#cocktailModal").removeClass("hidden");
}
function closeModal() {
  $("#cocktailModal").addClass("hidden");
}
//Wand Button Bounce :D
const button = document.getElementById("wand-btn");

button.addEventListener("click", function () {
  button.classList.add("animate__animated", "animate__bounce");
  console.log("Wand clicked!");
});
setTimeout(function () {
  button.classList.remove("animate__animated", "animate__bounce");
  console.log("Wand clicked!");
}, 1000);
