
const searchBox = document.querySelector('.searchBox');

const searchBtn = document.querySelector('.searchBtn');

const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Fuction to get recipes
const fetchRecipes = async (query) => {
	recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
	try {
		const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
		const response = await data.json();


		recipeContainer.innerHTML = "";
		response.meals.forEach(meals => {
			const recipeDiv = document.createElement('div');
			recipeDiv.classList.add('recipe');
			recipeDiv.innerHTML = `
	<img src="${meals.strMealThumb}">
	<h3 class="heading">${meals.strMeal}</h3>
	<p><span>${meals.strArea}</span> Dish</p>
	<p>Belongs to <span>${meals.strCategory}</span> Category</p>
`

			const button = document.createElement('button');
			button.textContent = "View Recipe";
			recipeDiv.appendChild(button);

			// Adding Eventlistener to recipe button
			button.addEventListener('click', () => {
				openRecipePopup(meals);
			});
			recipeContainer.appendChild(recipeDiv);

			//console.log(meals)
		});
	}
	catch (error) {
		recipeContainer.innerHTML = "<h2>Error in Fetching Recipes....</h2>";
	}
}
// Function to fetch ingredents and measurements
const fetchIngredients = (meals) => {
	let ingredientsList = "";
	for (let i = 1; i <= 20; i++) {
		const ingredent = meals[`strIngredient${i}`];
		if (ingredent) {
			const measure = meals[`strMeasure${i}`];
			ingredientsList += `<li>${measure} ${ingredent}</li>`
		}
		else {
			break;
		}
	}
	return ingredientsList;

	//console.log(meals);
}
const openRecipePopup = (meals) => {
	recipeDetailsContent.innerHTML = `
<h2 class="recipeName">${meals.strMeal}</h2>
<h3 class="heading">Ingredents:</h3>
<ul class="ingredientList">${fetchIngredients(meals)}</ul>
<div class="recipeInstructions">
<h3 class="heading">Instruction:</h3>
<p>${meals.strInstructions}</p>
</div>
`


	recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
	recipeDetailsContent.parentElement.style.display = "none"
});

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const searchInput = searchBox.value.trim();
	if (!searchInput) {
		recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
		return;
	}
	fetchRecipes(searchInput);


	// console.log("Button Clicked");
});