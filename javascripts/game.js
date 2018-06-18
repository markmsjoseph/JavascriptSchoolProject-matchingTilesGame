window.addEventListener('DOMContentLoaded', hello);

//handles when u click the play button to get the number of boxes
function hello(){
  document.getElementById('startButton').addEventListener('click', getNumberOfBoxes);
}

//gets the number of boxes to be displayed, if its more than 8, 8 will be displayed
//then it removes the form
function getNumberOfBoxes() {

  //get the number of boxes
    var numberOfBoxes = document.getElementById("numSymbols").value;
     if(numberOfBoxes > 8){
       numberOfBoxes = 8;
     }
    console.log("number of boxes is ", numberOfBoxes);

    //remove the form after the number has been selected
    document.getElementById('startForm').remove('startForm');

    //generate a game board with specified number of boxes
    generateGameBoard(numberOfBoxes);
}


//this function does most of the work. it keeps track of how many cards are flipped, flips them
//back over if they dont match, creates a new element ect
function generateGameBoard(numberOfBoxes){

  var game = document.getElementById('game');

  //create a new grid element and add it as a child of the div class
  var grid = document.createElement('div');
  grid.setAttribute('id', 'grid');
  game.appendChild(grid);

  //create a new guess element and insert it in the game class as the first child
  var guess = document.createElement('div');
  guess.setAttribute('id', 'guess');
  game.insertBefore(guess, grid);

  var displayGuess = document.getElementById('game');
  //add a custom field to the guess element
    document.getElementById('guess').guess = {
      number: 0
    }
    //create a textnode and insert it as a child of the guess element
    var content =  document.createTextNode("Number of guesses: " + document.getElementById('guess').guess.number);
    var texContent = document.createTextNode("Number of guesses: " + document.getElementById('guess').guess.number)
    guess.appendChild(texContent);

    //add tiles with specified number to the tiles array
    var randArray = getImages(numberOfBoxes);
    numberOfBoxes2 = numberOfBoxes * 2;

    var counter = 0;
    var tilesFlipped =0;
    var flippArray = [];
    var tiles = [];

    for (var i = 0; i < numberOfBoxes2; i++) {
      //this div element will hold the random symbol that will be displayed
          var div = document.createElement('div');  //create a new div element
          div.setAttribute('id', 'divTag'+ i);//set its id and its name
          var element = document.getElementById("grid");//get the div class from the html
          element.appendChild(div);//add the div element as a child of the game class

          //assign a custom attribute to each div class and assign the random symbol to it
          document.getElementById('divTag'+ i).myData = {
              name: randArray[i],
              id: 'divTag'+ i
            }

          tiles.push(div);//add it to the array
          div.style.cssText= 'font-size: 50px;  cursor: pointer; text-align:center;';//make inner html look nice
           div.style.border = '#000 1px solid';
          div.style.display= 'inline-block';
          div.style.width='71px';
          div.style.height='71px';
          div.style.float = 'left';
          div.style.margin = '10px';
          div.style.padding = '20px';
          div.style.cursor ='pointer';
          div.style.position = 'relative';
          div.style.boxShadow = ' 2px 2px 1px rgba(50, 50, 50, 0.75)';
           div.style.borderRadius = '25px';
        div.onmouseover = function() {
          this.style.border = '#FF0000 1px solid';
        }
        div.onmouseout = function() {
        this.style.border = '#000 1px solid';
        }
    }
    //add event listener to each divTag[i]
    console.log(randArray);
    for(var j =0; j< tiles.length; j++){
      //for each of the div element that hold random symbols, add the callback for when something
      //is clicked
        tiles[j].addEventListener('click', function(){
            //if no cards are displayed, add the one that was clicked to the array
                 //we add the symbol and the element
              //   console.log(this.myData.id);
                		if(flippArray.length == 0){
                      console.log("empty");
               			flippArray.push(document.getElementById(this.myData.id));//add to array
                     document.getElementById(this.myData.id).style.background = '#8A2BE2';//change the background of the tile
                     document.getElementById(this.myData.id).innerHTML = document.getElementById(this.myData.id).myData.name;//display the symbol
               	   }
                 //if one card was already flipped, we add the 1 that was just clicked
                 //to the array
                   else if(flippArray.length == 1){
                     var temp =  document.getElementById('guess');
                     document.getElementById('guess').guess.number++;
                    // document.getElementById('guess').guess.number.innerHTML = "sdfsd";
                     console.log("guess is", document.getElementById('guess').guess.number);
                     var newText = "Number of guesses: " + document.getElementById('guess').guess.number;
                     //var gez = newText.textContent;
                     document.getElementById('guess').textContent = newText;
                     console.log('one card in');
                      flippArray.push(document.getElementById(this.myData.id));
                      document.getElementById(this.myData.id).style.background = '#8A2BE2';
                      document.getElementById(this.myData.id).innerHTML = document.getElementById(this.myData.id).myData.name;
                      //if we have a matching pair of symbols
                    			if(flippArray[0].myData.name == flippArray[1].myData.name){
                            console.log("the first index is", flippArray[0].myData.name );
                            console.log("the second index is", flippArray[1].myData.name );
                            console.log('match');
                            flippArray[0].style.backgroundColor = '#00FF00';
                            flippArray[1].style.backgroundColor = '#00FF00';
                    				tilesFlipped = tilesFlipped + 2;
                   				flippArray = [];//reset the array

                               //check to see if we are out of tiles
                               if(tilesFlipped == tiles.length){
                                    clearBoard(tiles);
                                   alert("Number of Guesses made is : " + document.getElementById('guess').guess.number +
                                 "\n Game Over, Thank You");
                               }
                         }
                         //we do not have a matching pair so we flip the cards back over
                         else {
                           flippArray[0].style.backgroundColor = 'red';
                           flippArray[1].style.backgroundColor = 'red';
                           console.log('no match');
                           function flip2Back(){
                   				    var tile1 = flippArray[0];
                   				    var tile2 = flippArray[1];
                   				    tile1.style.background = 'white';
                               tile1.innerHTML = "";

                   				    tile2.style.background = 'white';
                               tile2.innerHTML = "";

                   				    flippArray = [];//reset the array
                            }
                            setTimeout(flip2Back, 700);//wait a while before flipping card back
                   		}
                   }
               });
    }

 }

//clears the board when the game is over
 function clearBoard(tiles){
  console.log("clearing board");
   for(var i = 0; i< tiles.length; i++){
     tiles[i].style.background = 'white';
     tiles[i].innerHTML = "";
   }

 }

//gets the symbols that will be displayed when u click on a box
function getImages(numberOfBoxes){
    var symbolArray = ['~', '@', '#', '$','%', '^','&','*'];//array of all possible symbols
    var newArray = [];//new array to hold the required length
    //due to the number of symbols that we want, we use the inputted number
    //and copy across from the array with all the possible values
    for (var i = 0; i < numberOfBoxes; i++) {
      newArray[i] = symbolArray[i];
    }
    //since we need to duplicate the array we copy it to have 2 of
    //the same symbols that we can match
    var copyOfNew = newArray;
    var finalArray = copyOfNew.concat(newArray);
    //use the shuffle method to randomize the array
    lastArray = shuffleArray(finalArray);
    return lastArray;
}

//shuffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
