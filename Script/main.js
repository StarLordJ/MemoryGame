var playArray = [];
var gameStart = function (id1, id2) {
    playArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
    fadeOut(document.querySelector(id1));
    switch (id1) {
            case '.start':
            fadeIn(document.querySelector(id2), ' field');
            randomizeCards();
            hideCards(playArray, 5000);
            break;

            case '.desk':
            removeCards();
            score = 0;
            counterRight = 0;
            $(".score_score").text(score);
            fadeIn(document.querySelector(id2), ' desk');
            randomizeCards();
            hideCards(playArray, 5000);
            break;

            case '.gameEnd':
            removeCards();
            score = 0;
            counterRight = 0;
            $(".score_score").text(score);
            fadeIn(document.querySelector(id2), ' field');
            randomizeCards();
            hideCards(playArray, 5000);
            break;
        default:
    }
}

var fadeOut = function (element) {
element.className += ' hide';
setTimeout(function(){
    element.className += ' hidden';
    element.classList.remove('hide');
    element.classList.remove('field')
}, 250);
}

function fadeIn(element, display){
    setTimeout(function() {
        element.className += ' show';
        element.classList.remove('hidden');
        setTimeout(function(){
            element.className += display;
        element.classList.remove('show');
        ;},550);
    },550);
}

function removeCards(){
    setTimeout(function(){
    var parent = document.querySelector('.desk');
    for(var i = 1; i<=18;i++){
        var child = document.getElementById(i.toString());
        parent.removeChild(child);
    }
},250);
}

 function createCard(atr, a){
     var parent = document.querySelector('.desk');
     var card = document.createElement('div');
     var flipper = document.createElement('div');
     var front = document.createElement('img');
     var back = document.createElement('img');
     card.id = a+1;
     card.className = 'card';
     flipper.className = 'flipper';
     front.className = 'front';
     back.className = 'back';
     card.setAttribute("data-myValue", atr)
     card.setAttribute("onclick", "flippingFront(this.id)")
     front.setAttribute("src", atr);
     back.setAttribute("src", "Img/Cards/rubashka.png");
     flipper.appendChild(front);
     flipper.appendChild(back);
     card.appendChild(flipper);
     parent.appendChild(card);
  }

function compareRandom(a, b){
    return Math.random() - 0.5;
}

function randomizeCards(){
    setTimeout(function () {
    var cardsArray=[];
    for(var i = 0; i<52;i++){
        var n = i+1;
        cardsArray.push("Img/Cards/"+n+".png");
    }
    var halfArray=[];
    for(var i = 0; i<9;i++){
        var min=0;
        var max= cardsArray.length -1;
        var newUrl = (Math.floor(Math.random()*(max+min)));
        halfArray.push(cardsArray[newUrl]);
        cardsArray.splice(newUrl, 1);
    }
    var arr18 = halfArray.concat(halfArray).sort(compareRandom);
    for(var i = 0; i<18; i++){
        createCard(arr18[i],i);
    }
}, 550);
}

function hideCards(arr, ms){
    setTimeout(function(){
        for (var i = 0; i<arr.length; i++){
            flippingBack(arr[i]);
        }
        arr.splice(0, arr.length);
    }, ms)
}

var flippingBack = function(id) {
  var card = document.getElementById(id);
    card.className = card.className + ' flipped';
}

function rightCards(element){
    setTimeout(function(){
        element.className += ' hidden_card'
    }, 100);
    element.className = element.className + ' hide';

    element.removeAttribute("onclick");

  }

var arrayChoose = [];
var score = 0;
var counterRight = 0;

var flippingFront = function(id) {
    if (arrayChoose.length < 2){
        var card = document.getElementById(id);
        playArray.push(id);
        arrayChoose.push(card.getAttribute('data-myValue'));
        console.log(arrayChoose);
        console.log(playArray);
        card.className = 'card';
        if(arrayChoose.length == 2){
            if(playArray[0] != playArray[1]){
                if(arrayChoose[0] == arrayChoose[1]){
                    setTimeout(function(){
                        for (var i = 0; i<2;i++){
                            rightCards(document.getElementById(playArray[i]))
                        }
                        counterRight += 1;
                        if(counterRight == 9){
                            fadeOut(document.querySelector('.gameField'));
                            fadeIn(document.querySelector('.gameEnd'), ' field');
                        }
                        score = score + (9 - counterRight)*42;
                        $(".score_score").text(score);
                        console.log(counterRight);
                        playArray.splice(0,2);
                    }, 1000);
                        arrayChoose.splice(0, 2);
                    }
                else {
                    setTimeout(function(){
                    hideCards(playArray, 1);
                    arrayChoose.splice(0, 2);
                    score = score - counterRight*42;
                    $(".score_score").text(score);
                    console.log(score)}, 500);
                }
            }
            else {
                playArray.splice(1,1);
                arrayChoose.splice(1, 1);
            }
        }
    }
}
