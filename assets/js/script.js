//establish variables

//when user searches item(s) fetch api to display on the screen 

//when video and/or article is added to page, user can save video
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
//function for retrieving info from Tasty API
function getID(data){
    let resArea = document.querySelector('.resultsArea')
    let resultBox = document.createElement('div')
    resultBox.classList = "resultBox columns is-flex-wrap-wrap is-half"

//for loop for API data     

    for(i = 0; i < 10; i++){
        //change

    for(i = 0; i < 5; i++){


        const id  = data.results[i].id
        const name = data.results[i].name
        const desc = data.results[i].description
        console.log(id)
        
        
        let card = document.createElement('div');
        card.className = 'recCard';
        // card.id = id
        
        card.classList = "recCard card tile is-vertical column is-one-third m-3";
        let recName = document.createElement('h3')
        recName.classList = "is-size-3"
        recName.innerHTML = name;
        recName.id = id;
        card.appendChild(recName)
        let recDesc = document.createElement('p')
        recDesc.innerHTML = desc;//change to recip container
        card.appendChild(recDesc)//change
        let saveBtn = document.createElement('button') 
        let atag = document.createElement('a')
        atag.textContent = "Save Recipe"
        atag.setAttribute('href','./assets/page2.html')
        saveBtn.className = "save"

        saveBtn.onclick = storeRecipe//change
        saveBtn.id = id//change
        saveBtn.appendChild(atag)

        saveBtn.id = "recipe";
        saveBtn.onclick = storeRecipe;
        card.appendChild(saveBtn)
        resultBox.appendChild(card)
        resArea.appendChild(resultBox)
    }
    
}

// function storeRecipe(event){ 
//     let inputKey = event.target.id
//     console.log(event.target.previousElementSibling.previousElementSibling)
//     let inputValue = event.target.previousElementSibling.previousElementSibling.innerHTML
//     console.log(inputKey, inputValue)
//     localStorage.setItem(inputKey, inputValue);


function storeRecipe(event){ 
    let inputKey = event.target.id
    console.log(event.target.previousElementSibling.previousElementSibling)
    let inputValue = event.target.previousElementSibling.previousElementSibling.innerHTML
    console.log(inputKey, inputValue)
    localStorage.setItem(inputKey, inputValue);
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




//kim's code*******************************************************************************************

function getVideos() {
  //added line below to erase previous search  
  // recipeContatiner.innerHTML = ' '
  var input = document.getElementById("recSearch").value;
  console.log(input);
  var getUrl2 =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=videoCount&q=recipe" +
    input +
    "&type=video&key=AIzaSyAy5NFzhSUlB1PosqxAdouH6vcd1wMT3ZQ";
  console.log(getUrl2);

//fetch Youtube API  
  fetch(getUrl2)
    .then((response) => response.json())
    .then((data) => getVidID(data))
}

// for loop function that calls Youtube API 
function getVidID(data){
  let resArea = document.querySelector('.resultsArea')
  let resultBox = document.createElement('div')
  resultBox.classList = "resultBox columns is-flex-wrap-wrap is-half"
  
  for(i = 0; i < 10; i++){
      //change
      link = 'https://www.youtube.com/watch?v=' + data.items[i].id.videoId;
      image = data.items[i].snippet.thumbnails.default.url;
      // link.appendChild(image)
    
      const title = data.items[i].snippet.title;
            
      let card = document.createElement('div');
      card.className = 'recCard';
     
      //Element creation for data pulled from the API
      card.classList = "recCard card tile is-vertical column is-three-quarters m-3";
      let recName = document.createElement('h3')
      recName.classList = "is-size-3 is-flex-wrap-wrap"
      recName.innerHTML = title;
      card.appendChild(recName)
      let recDesc = document.createElement('a')
      recDesc.innerHTML = link;
      recDesc.href = link;
      card.appendChild(recDesc)//change
      let videoImage = document.createElement('p')
      videoImage.innerHTML = image;
      let saveBtn = document.createElement('button') 
      let atag = document.createElement('a')
      atag.textContent = "Save Recipe"
      atag.setAttribute('href','./assets/page2.html')
      saveBtn.className = "save"
      saveBtn.onclick = getVideos//change
      saveBtn.id = link;//change
      saveBtn.appendChild(atag)
      card.appendChild(saveBtn)
      resultBox.appendChild(card)
      resArea.appendChild(resultBox)
    }
}

//remove data when searching new input+
let timesClicked = 0;

function clicked(){
 timesClicked++;
 if (timesClicked>1){
    removeRecipes();
    getURL();
 }else {
    getURL();
    getVideos();
 }
} 
//call api data function through click 
searchBTN.addEventListener('click', clicked)
// saveRecipe.addEventListener('click', storeRecipe)

document.addEventListener('click',function(e){
    if(e.target && e.target.className === 'save'){
          storeRecipe;
     }
 });
