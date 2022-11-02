// function to loop over recipes item in storage and append data to cards
let recipesKey = JSON.stringify(localStorage.getItem('recipes'))
let recipeID = recipesKey.trim().split(",");
console.log(recipeID);