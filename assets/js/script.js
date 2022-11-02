const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '53df368d57msh1f4523eee823f73p114681jsn59f031fdad1b',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

var searchBTN = document.querySelector('#search')

var savedRecipes = document.getElementById('savedRecipes')

savedRecipes.onclick = function(){
    location.href = "page2.html"
}
var saveRecipe = document.querySelector('.save')

function getURL(){
    var key = "53df368d57msh1f4523eee823f73p114681jsn59f031fdad1b"
    
    var inputValue = document.getElementById('recSearch').value

    var searchURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes,easy&q='+inputValue +'&rapidapi-key='+key

    console.log(inputValue)

    fetch(searchURL, options)
	.then(response => response.json())
    // .then(data => console.log(data))
	// .then(data => console.log(data.results[0].id))
    .then((data) => getID(data))
        
    // add function to display error message

	// .catch(err => console.error(err));

}

function getID(data){
    let resArea = document.querySelector('.resultsArea')
    let resultBox = document.createElement('div')
    resultBox.classList = "resultBox columns is-flex-wrap-wrap"

    for(i = 0; i < 5; i++){

        const id  = data.results[i].id
        const name = data.results[i].name
        const desc = data.results[i].description
        console.log(id)
        
        
        let card = document.createElement('div');
        card.className = 'recCard';
        // card.id = id
        
        card.classList = "recCard card tile is-vertical column is-one-fifth m-3";
        let recName = document.createElement('h3')
        recName.classList = "is-size-3"
        recName.innerHTML = name;
        recName.id = id;
        card.appendChild(recName)
        let recDesc = document.createElement('p')
        recDesc.innerHTML = desc;
        card.appendChild(recDesc)
        let saveBtn = document.createElement('button')
        saveBtn.textContent = "Save Recipe"
        saveBtn.className = "save"
        saveBtn.id = "recipe";
        saveBtn.onclick = storeRecipe;
        card.appendChild(saveBtn)
        resultBox.appendChild(card)
        resArea.appendChild(resultBox)
    }
    
}

let recAmount = [];

function storeRecipe(event){
    let inputKey = 'recipes';
    console.log(event.target.previousElementSibling.previousElementSibling)
    let inputValue = event.target.previousElementSibling.previousElementSibling.id
    recAmount.push(inputValue)
    // console.log(inputKey, inputValue)
    localStorage.setItem(inputKey, recAmount);
}

function removeRecipes(){
    let remArea= document.querySelector('.resultBox')
    // let remCard = document.getElementsByClassName('recCard')
    
    // remArea.childNodes.forEach(remCard => remCard.remove())
    remArea.remove();
}

let timesClicked = 0;

function clicked(){
 timesClicked++;
 if (timesClicked>1){
    removeRecipes();
    getURL();
 }else {
    getURL();
 }
} 

searchBTN.addEventListener('click', clicked)
// saveRecipe.addEventListener('click', storeRecipe)
// document.addEventListener('click',function(e){
//     if(e.target && e.target.className === 'save'){
//           storeRecipe;
//      }
//  });