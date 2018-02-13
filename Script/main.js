var playArray = [];
var score;
var counterRight;
var timeoutID;
var cardsA = {};
var cardsArray = ['0C.png','0D.png','0H.png','0S.png','2C.png','2D.png','2H.png','2S.png',
                  '3C.png','3D.png','3H.png','3S.png','4C.png','4D.png','4H.png','4S.png',
                  '5C.png','5D.png','5H.png','5S.png','6C.png','6D.png','6H.png','6S.png',
                  '7C.png','7D.png','7H.png','7S.png','8C.png','8D.png','8H.png','8S.png',
                  '9C.png','9D.png','9H.png','9S.png','AC.png','AD.png','AH.png','AS.png',
                  'JC.png','JD.png','JH.png','JS.png','KC.png','KD.png','KH.png','KS.png',
                  'QC.png','QD.png','QH.png','QS.png'];
var soundsArray = ['for button.mp3','Right.mp3','Ta-da.mp3', 'WalkinThePark.mp3', 'flippingback.mp3', 'flipping.mp3','loose.mp3', 'Intro55.mp3', 'allcards.mp3'];
var audiob = new Audio();

window.onload = function() {
  changeScreens('.loading', '.app-start');
  delaySound('Sounds/Intro55.mp3');
}

$(document).ready(function(){
  preloadContent();
  $('.button').click(function(){
    soundClick('Sounds/for button.mp3')
    stopBackgroundSound();
    backgroundSound('Sounds/WalkinThePark.mp3');
    enableButton(this);
    var id = defineId($(this).parent().attr("id"));
    score = 0;
    counterRight = 0;
    changeScreens(id[0], id[1]);
    loadCards(id[0]);
  })
  $('.icon').click(function(){
    console.log(this.alt);
    switch (this.alt) {
      case 'Выключить музыку':
      this.src = 'Img/MusicNo.png';
      this.alt = 'Включить музыку'
      muteBackgroundSound();
      break;
      case 'Включить музыку':
      this.src = 'Img/MusicYes.png';
      this.alt = 'Выключить музыку';
      playBackgroundSound();
    }
  })
})

var preloadContent = function(){
  var div = document.getElementById('preloaded');
  for (var i = 0; i < cardsArray.length - 1; i++) {
      var img = document.createElement('img');
      img.setAttribute('src','Img/Cards/' + cardsArray[i]);
      div.appendChild(img);
    }
    var img = document.createElement('img');
    img.setAttribute('src','Img/0.png');
    div.appendChild(img);
    for (var i = 0; i < soundsArray.length - 1; i++) {
      var audio = document.createElement('audio');
      audio.setAttribute('src','Sounds/' + soundsArray[i]);
      div.appendChild(audio);
    }
  }


var defineId = function(a) {
  switch (a) {
    case 'app-start':
    return ['.app-start', '.app-game']
    break;
    case 'game-menu':
    return ['.deck', '.deck']
    break;
    case 'app-end':
    return ['.app-end', '.app-game']
    break;
  }
}

var enableButton = function(elem){
  elem.setAttribute('disabled','true');
  setTimeout(function(){
    elem.removeAttribute('disabled');
  }, 500);
}

var loadCards = function(id1){
    if ((id1 == '.deck')||(id1 == '.app-end')){
        removeCards();
    }
    setTimeout(function(){
      $(".score_score").text(score);
      randomizeCards();

        $(".card").click(function() {
        addAndCompare(this.id);
      })
      hideCardsFiveSec(playArray);
    }, 500)
}

function hideCardsFiveSec(arr) {
  clearTimeout(timeoutID);
  timeoutID =  setTimeout(function() {
    hideCards(arr);
    soundClick('Sounds/allcards.mp3');
  }, 5000);
}
var changeScreens = function(id1, id2) {
    fade(document.querySelector(id1), 'is-displayed', 'hide');
    setTimeout(function(){
        fade(document.querySelector(id2), 'is-displayed', 'show');
    },400);
}

function fade(element, display, animate){
    element.className += ' ' + animate;
    if ($(element).hasClass(display)){
        setTimeout(function(){
            $(element).removeClass(display);
            $(element).removeClass(animate);
        },350);
    } else {
        element.className += ' ' +  display;
        setTimeout(function(){
            $(element).removeClass(animate);
        },350);
    }
}

function removeCards(){
  setTimeout(function(){
    var parent = document.querySelector('.deck');

    for(var i = 1; i<=18;i++){
        var child = document.getElementById(i.toString());
        parent.removeChild(child);
    }
  },350);
}

function createCard(atr, a) {
  var parent = document.querySelector('.deck');
  var card = document.createElement('div');
  var flipper = document.createElement('div');
  var front = document.createElement('img');
  var back = document.createElement('img');
  s = a + 1;
  card.id = s;
  card.className = 'card';
  card.setAttribute('data-tid', 'Card');
  flipper.className = 'flipper';
  front.className = 'front';
  back.className = 'back';
  front.setAttribute("src", atr);
  flipper.appendChild(front);
  flipper.appendChild(back);
  card.appendChild(flipper);
  parent.appendChild(card);
  cardsA[s] = atr;
  playArray[a] = s;
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function randomizeCards() {

  var halfArray=[];
  var gameArrtay = [];

  cardsArray.sort(compareRandom);

  for (var i = 0; i < 9; i++) {
    halfArray.push('Img/Cards/' + cardsArray[i]);
    }

  gameArray = halfArray.concat(halfArray).sort(compareRandom);
  for (var i = 0; i < 18; i++) {
    createCard(gameArray[i],i);
  }
}

function hideCards(arr) {

  for (var i = 0; i < arr.length; i++) {
    flippingBack(arr[i]);
  }
  arr.splice(0, arr.length);
}

var flippingBack = function(id) {
  var card = document.getElementById(id);
  card.className = card.className + ' flipped';
  card.setAttribute('data-tid', 'Card-flipped');
}

var flippingFront = function(id) {
  var card = document.getElementById(id);
  card.className = 'card';
  card.setAttribute('data-tid', 'Card');
}

var removeCard = function(id) {
  var card = document.getElementById(id);
  fade(card, 'is-hidden', 'hide');
  card.removeAttribute('data-tid');
}

function soundClick(sr){
  var audio = new Audio();
  audio.src = sr;
  audio.autoplay = true;
}

function delaySound(sr){
  setTimeout(function() {
    soundClick(sr);
  }, 500);
}

function backgroundSound(sr){
  audiob.src = sr;
  audiob.autoplay = true;
  console.log(document.getElementsByClassName('icon')[0].alt);
  if (document.getElementsByClassName('icon')[0].alt === 'Включить музыку') {
  audiob.volume = 0;
} else {
  audiob.volume = 0.3;
}
}
function stopBackgroundSound(){
  audiob.pause();
  audiob.currentTime = 0.0;
}
function muteBackgroundSound(){
  audiob.volume = 0;
}
function playBackgroundSound(){
  audiob.volume = 0.5;
}

var addAndCompare = function(id) {
  if ($(document.getElementById(id)).hasClass('flipped')) {
    flippingFront(id);
    soundClick('Sounds/flipping.mp3');
    /*soundClick('Sounds/forcard.mp3');*/
    playArray.push(id);
    console.log(playArray);
    if (playArray.length == 2) {
      if (cardsA[playArray[0]] == cardsA[playArray[1]]) {
        delaySound('Sounds/Right.mp3');
        counterRight += 1;
        score = score + (9 - counterRight)*42;
        setTimeout(function() {
          for (var i = 0; i < 2; i++) {
            removeCard(playArray[i]);
          }
          if (counterRight == 9) {
            stopBackgroundSound()
            changeScreens('.app-game', '.app-end');
            if (score <= 0) {
              delaySound('Sounds/loose.mp3');
              document.getElementsByClassName('name')[1].innerHTML ='Ты можешь лучше!!!<br><span class="score_score"></span>';
            }
            else {
            delaySound('Sounds/Ta-da.mp3')
            document.getElementsByClassName('name')[1].innerHTML ='Поздравляем!<br>Ваш итоговый счёт: <span class="score_score"></span>';
          }
              }
          playArray.splice(0,2);
        }, 500);
      } else {
        delaySound('Sounds/flippingback.mp3');
          score = score - counterRight*42;
          setTimeout(function() {
            hideCards(playArray);
          }, 400);
        }
      setTimeout(function(){
      document.getElementsByClassName('score_score')[0].innerHTML = score;
    },510);
    }
  }
}
