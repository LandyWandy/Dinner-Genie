let landonKey="7e3f137972mshd515359a84b2ff9p113446jsn700b94e62ef7"
let megsKey="c934e6b007msh76d8b17e732ba94p14495ejsndf11a0d68e49"
let rosaKey="4bddcff26bmsh3341d016a17aa08p1a829ejsnf02400f6c0df"
let bellaKey="72c9585311msh4f40ae66cddb063p1515bfjsnc61882058676"
let rafaelKey="4373181a13mshb854ccce485fbcfp1ec2f2jsn4a150d9d81a6"

// Array of everyones API keys

let keyArray = [landonKey,megsKey,rosaKey,bellaKey,rafaelKey]


let keyArrayIndex = 0

// This function will will iterate through each of our API keys one by one every time the API is hit
// To use this function place getNextKey() in the 'X-RapidAPI-Key': field

function getNextKey() {
	let key = keyArray[keyArrayIndex]
	keyArrayIndex = (keyArrayIndex+1) % keyArray.length

return key
}

// Food API by ingredient LEAVE API KEY EMPTY WHEN WORKING IN JS

const Foodies = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': "",
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false&minProtein=0&minVitaminC=0&minSelenium=0&maxFluoride=50&maxVitaminB5=50&maxVitaminB3=50&maxIodine=50&minCarbs=0&maxCalories=250&minAlcohol=0&maxCopper=50&maxCholine=50&maxVitaminB6=50&minIron=0&maxManganese=50&minSodium=0&minSugar=0&maxFat=20&minCholine=0&maxVitaminC=50&maxVitaminB2=50&minVitaminB12=0&maxFolicAcid=50&minZinc=0&offset=0&maxProtein=100&minCalories=0&minCaffeine=0&minVitaminD=0&maxVitaminE=50&minVitaminB2=0&minFiber=0&minFolate=0&minManganese=0&maxPotassium=50&maxSugar=50&maxCaffeine=50&maxCholesterol=50&maxSaturatedFat=50&minVitaminB3=0&maxFiber=50&maxPhosphorus=50&minPotassium=0&maxSelenium=50&maxCarbs=100&minCalcium=0&minCholesterol=0&minFluoride=0&maxVitaminD=50&maxVitaminB12=50&minIodine=0&maxZinc=50&minSaturatedFat=0&minVitaminB1=0&maxFolate=50&minFolicAcid=0&maxMagnesium=50&minVitaminK=0&maxSodium=50&maxAlcohol=50&maxCalcium=50&maxVitaminA=50&maxVitaminK=50&minVitaminB5=0&maxIron=50&minCopper=0&maxVitaminB1=50&number=3&minVitaminA=0&minPhosphorus=0&minVitaminB6=0&minFat=5&minVitaminE=0', Foodies)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

	// Drink API by ingredient LEAVE API KEY EMPTY WHEN WORKING IN JS

	const Drinkies = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': "",
			'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
		}
	};
	
	fetch('https://the-cocktail-db.p.rapidapi.com/search.php?s=vodka', Drinkies)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
