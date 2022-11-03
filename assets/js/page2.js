// function to loop over recipes item in storage and append data to cards
let recipeArray = JSON.parse(localStorage.getItem('recipes'))

var key = "53df368d57msh1f4523eee823f73p114681jsn59f031fdad1b"

var searchURL = 'https://tasty.p.rapidapi.com/recipes/get-more-info'

var saveArea = document.getElementById("my-recipes")

const options = {
	method: 'GET',
	headers: {'X-RapidAPI-Key': '53df368d57msh1f4523eee823f73p114681jsn59f031fdad1b', 'X-RapidAPI-Host': 'tasty.p.rapidapi.com'}
};

for (var i = 0; i < recipeArray.length; i++){
    var recipeID = recipeArray[i].id
    fetch('https://tasty.p.rapidapi.com/recipes/get-more-info?id=' + recipeID, options)
	.then(response => response.json())
	.then(data => makeRecipeCards(data))
	// .catch(err => console.error(err));
}

function makeRecipeCards(data){
    let recName = data.name;
            
            let recPicURL = data
            let recPic = document.createElement('img')
            recPic.src = recPicURL

            let recLink = data.renditions.url;

            let card = document.createElement('div')
            card.classList = "card tile is-vertical column is-one-fifth m-3"

            let header = document.createElement('h1')
            header.innerHTML = recName;

            let figure = document.createElement('figure')
            figure.classList = "image is-4by3"
            figure.append(recPic)

            let recURL = document.createElement('a')
            recURL.innerHTML = recLink

            card.appendChild(header)
            card.appendChild(figure)
            card.appendChild(recURL)
            saveArea.appendChild(card)
    // var recipeTitle = data.name;
    // var titleEl = document.createElement("h2").textContent = recipeTitle;
    // document.querySelector(".myRecipes").append(titleEl)
}

// let recipeID = recipesKey.trim().split(",");
// console.log(recipeID);

// const options = {
//     method: 'GET',
//     url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
//     params: {id: '8138'},
//     headers: {'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY', 'X-RapidAPI-Host': 'tasty.p.rapidapi.com'}
//   };
  
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });

