var playArray = [];
var arrayChoose = [];
var score;
var counterRight;
var timeoutID;

$(document).ready(function() {
  var allImg = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21',
                '22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41',
                '42','43','44','45','46','47','48','49','50','51','52','rubashka'];

  for (var i = 0; i < 53; i++) {
        preload(allImg[i]);
    }
}
);

window.onload = function() {
  changeScreens('.loading', '.start');
}

var preload = function(a){
  var div = document.getElementById("preloaded");
  var img = document.createElement('img')
  img.setAttribute('src','Img/Cards/'+a+'.png');
  div.appendChild(img);
}

var gameStart = function (id1, id2) {
    changeScreens('.blocked', '.blocked');
    playArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
    arrayChoose = [];
    score = 0;
    counterRight = 0;
    changeScreens(id1, id2);
    loadCards(id1, id2);
}

var loadCards = function(id1, id2){
    if ((id1 == '.desk')||(id1 == '.gameEnd')){
        removeCards();
    }
        setTimeout(function(){
        $(".score_score").text(score);
        randomizeCards()
        hideCardsFiveSec(playArray);
    }, 500)
}

 function hideCardsFiveSec(arr){
     clearTimeout(timeoutID)
     timeoutID =  setTimeout(function(){
    hideCards(arr);
}, 5000);
}
var changeScreens = function(id1, id2) {
    fade(document.querySelector(id1), 'field', 'hide');
    setTimeout(function(){
        fade(document.querySelector(id2), 'field', 'show');
    },500);
}
var changeScreens1 = function(id1, id2) {
    fade(document.querySelector(id1), 'field');
    setTimeout(function(){
        fade(document.querySelector(id2), 'field');
    },500);
}

function fade(element, display, animate){
    element.className += ' ' + animate;
    if (element.classList.contains(display)){
        setTimeout(function(){
            element.classList.remove(display);
            element.classList.remove(animate);
        },450);
    } else {
        element.className += ' ' +  display;
        setTimeout(function(){
            element.classList.remove(animate);
        },450);
    }
}

function removeCards(){
  setTimeout(function(){
    var parent = document.querySelector('.desk');

    for(var i = 1; i<=18;i++){
        var child = document.getElementById(i.toString());
        parent.removeChild(child);
    }
  },350);
}

function createCard(atr, a) {
  var parent = document.querySelector('.desk');
  var card = document.createElement('div');
  var flipper = document.createElement('div');
  var front = document.createElement('img');
  var back = document.createElement('img');
  card.id = a + 1;
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

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function randomizeCards() {
  var cardsArray=[];
  var halfArray=[];

  for (var i = 0; i < 52; i++) {
    var n = i+1;
    cardsArray.push("Img/Cards/"+n+".png");
  }

  for (var i = 0; i < 9; i++) {
    var min=0;
    var max= cardsArray.length -1;
    var newUrl = (Math.floor(Math.random()*(max+min)));
    halfArray.push(cardsArray[newUrl]);
    cardsArray.splice(newUrl, 1);
    }

  var arr18 = halfArray.concat(halfArray).sort(compareRandom);

  for (var i = 0; i < 18; i++) {
    createCard(arr18[i],i);
  }
}

function hideCards(arr, ms) {

  for (var i = 0; i < arr.length; i++) {
    flippingBack(arr[i]);
  }
  arr.splice(0, arr.length);
}

var flippingBack = function(id) {
  var card = document.getElementById(id);
  card.className = card.className + ' flipped';
}

var flippingFront = function(id) {
  if (arrayChoose.length < 2) {
    var card = document.getElementById(id);
    card.className = 'card';
    playArray.push(id);
    arrayChoose.push(card.getAttribute('data-myValue'));
    console.log(arrayChoose);
    console.log(playArray);
    if (arrayChoose.length == 2) {
      if (playArray[0] != playArray[1]) {
        if (arrayChoose[0] == arrayChoose[1]) {
          setTimeout(function() {
            for (var i = 0; i < 2; i++) {
              fade(document.getElementById(playArray[i]), 'show_card', 'hide');
              document.getElementById(playArray[i]).removeAttribute('onclick');
            }
            counterRight += 1;
            score = score + (9 - counterRight)*42;
            if (counterRight == 9) {
              changeScreens('.gameField', '.gameEnd');
            }
            $(".score_score").text(score);
            playArray.splice(0,2);
            arrayChoose.splice(0, 2);
          }, 500);
        } else {
            setTimeout(function() {
              hideCards(playArray);
              arrayChoose.splice(0, 2);
              score = score - counterRight*42;
              $(".score_score").text(score);
              console.log(score)
            }, 500);
          }
      } else {
          playArray.splice(1,1);
          arrayChoose.splice(1, 1);
      }
    }
  }
}
