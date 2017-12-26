var playArray = [];
var gameStart = function (id1, id2) {
     playArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
    fadeOut(document.getElementById(id1), 10);
    switch (id1) {
            case 'desk':
            removeCards();
            break;
        default:
    }

  randomizeCards();
  fadeIn(document.getElementById(id2), 2000, 'grid');
  hideCards(playArray, 5000);
}

var fadeOut = function (element, ms) {
  var opacity = 1
  var timer = setInterval(function () {
    if (opacity <= 0.1) {
      clearInterval(timer)
      element.style.display = 'none'
    }
    element.style.opacity = opacity
    opacity -= 0.01
}, ms/100)
}

function removeCards(){
    setTimeout(function(){
        for(var i = 1; i<=18;i++){
            document.getElementById(i.toString()).remove();
        }
    }, 100);
}

function fadeIn(element, ms, display){
    setTimeout(function () {
        var opacity = 0.1
        element.style.display = display
        element.style.opacity = opacity
        var timer = setInterval(function() {
             if (opacity >= 1) {
                 clearInterval(timer)
             }
        element.style.opacity = opacity
        opacity += 0.01
        }, ms/100)
    }, 3000)
}

 function createCard(atr, a){
     var parent = document.getElementById('desk');
     var card = document.createElement('div');
     var front = document.createElement('div');
     var back = document.createElement('div');
     card.id = a+1;
     card.className = 'card';
     front.className = 'front';
     back.className = 'back';
     card.setAttribute("data-myValue", atr)
     card.setAttribute("onclick", "flippingFront(this.id)")
     front.setAttribute("style", "background-image: url("+atr+");");
     back.setAttribute("style", "background-image: url(Img/Cards/rubashka.png);");
     card.appendChild(front);
     card.appendChild(back);
     parent.appendChild(card);
  }
function compareRandom(a, b){
    return Math.random() - 0.5;
}

function randomizeCards(){
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
};

function rightCards(element, ms){
    var opacity = 1
    var timer = setInterval(function () {
      if (opacity <= 0.1) {
        clearInterval(timer)
        element.className =  'hidden';
      }
      element.style.opacity = opacity
      opacity -= 0.01
  }, ms/100)
  }


var arrayChoose = [];
var flippingFront = function(id) {
    if (arrayChoose.length < 2){
        var card = document.getElementById(id);
        playArray.push(id);
        arrayChoose.push(card.getAttribute('data-myValue'));
        console.log(arrayChoose);
        console.log(playArray);
        card.className = 'card';
        if(arrayChoose.length == 2){
            if(arrayChoose[0] == arrayChoose[1]){
                setTimeout(function(){
                for (var i = 0; i<2;i++){
                    rightCards(document.getElementById(playArray[i]), 100)
                }
                playArray.splice(0,2);
            }, 1000);
                arrayChoose.splice(0, 2);
            }
            else {
                setTimeout(function(){
                    hideCards(playArray, 1)}, 500);
                arrayChoose.splice(0, 2);
            }
        }
    }
}
