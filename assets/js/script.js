let landonKey="7e3f137972mshd515359a84b2ff9p113446jsn700b94e62ef7"
let megsKey="c934e6b007msh76d8b17e732ba94p14495ejsndf11a0d68e49"
let rosaKey="4bddcff26bmsh3341d016a17aa08p1a829ejsnf02400f6c0df"
let bellaKey="72c9585311msh4f40ae66cddb063p1515bfjsnc61882058676"
let rafaelKey="4373181a13mshb854ccce485fbcfp1ec2f2jsn4a150d9d81a6"

// Array of everyones API keys

let keyArray = [landonKey,megsKey,rosaKey,bellaKey,rafaelKey]

// currentIndex declared outside of getNextKey to keep track of the current position in th array

// console.log(keyArray[0])

// Food API by ingredient LEAVE KEY EMPTY WHEN WORKING IN JS

const Foodies = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': "",
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=3&ignorePantry=true&ranking=1', Foodies)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


	// Drink API by ingredient LEAVE API KEY EMPTY WHEN WORKING IN JS

	const Drinkies = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': getNextKey(),
			'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
		}
	};

// This is to see what fields we can take in from the console

function getRandomCocktail() {
    fetch("https://thecocktaildb.p.rapidapi.com/random.php?a=Alcoholic", Drinkies)
        .then((response) => response.json())
        .then((data) => console.log(data.drinks[0]))
        .catch((error) => console.error("Error:", error));
}

// This function displays random cocktail on DOM

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
