function Card(frontName, back, id) {
    this.front = frontName;
    this.back = back;
    this.flipped = false;
    this.id = id;
    this.active = true;
}

function View() {
    this.app = document.querySelector('.app');
    this.screenLoading = document.querySelector('.screenLoading');
    this.screenStart = document.querySelector('.screenStart');
    this.screenGame = document.querySelector('.screenGame');
    this.screenEnd = document.querySelector('.screenEnd');
    this.buttonStart = document.querySelector('.screenStart__button');
    this.buttonGame = document.querySelector('.gameMenu__button');
    this.buttonEnd = document.querySelector('.screenEnd__button');
    this.deck = document.querySelector('.cardDeck');
    this.preloaded = document.querySelector('.preloadContent');
    this.screenEndText = document.querySelector('.screenEnd__text');
    this.displayScoreE = document.querySelector('.gameMenu__value');
    this.screenEndScore = document.querySelector('.screenEnd__scoreValue');
    this.controllerAudio = document.querySelector('.icon');
    this.backgroundAudio = '';


    this.changeScreens = function (button) {
        if (button.className === this.buttonStart.className)
            this.swap(this.screenStart, this.screenGame);
        if (button.className === this.buttonGame.className)
            this.swap(this.deck, this.deck);
        if (button.className === this.buttonEnd.className)
            this.swap(this.screenEnd, this.screenGame);
    };
    this.swap = function (screen1, screen2) {
        this.hide(screen1);
        this.show(screen2);
    };
    this.hide = function (element) {
        this.fade(element, 'is-displayed', 'hide');
    };
    this.show = function (element) {
        var self = this;
        setTimeout(function () {
            self.fade(element, 'is-displayed', 'show');
        }, 450);
    };
    this.fade = function (element, display, animate) {
        element.classList.add(animate);
        if (element.classList.contains(display)) {
            setTimeout(function () {
                element.classList.remove(display);
                element.classList.remove(animate);
            }, 290);
        }
        else {
            element.classList.add(display);
            setTimeout(function () {
                element.classList.remove(animate);
            }, 310);
        }
    };
    this.gameEnd = function (score) {
        if (score <= 0) {
            this.screenEndText.innerText = 'Ты можешь лучше!!!';
            this.screenEndScore.innerText = score;
        }
        else {
            this.screenEndText.innerText = 'Поздравляем!';
            this.screenEndScore.innerText = 'Ваш итоговый счёт: ' + score;
        }
    };
    this.flipFront = function (card) {
        card.classList.remove('flipped');
        card.setAttribute('data-tid', 'Card');
    };
    this.flipBack = function (card) {
        card.classList.add('flipped');
        card.setAttribute('data-tid', 'Card-flipped');
    };
    this.hideCard = function(card) {
        this.fade(card, 'is-hidden', 'hide');
        card.removeAttribute('data-tid');
    };
    this.displayScore = function(score) {
        this.displayScoreE.innerText = score;
    };
    this.createCard = function (cardObj) {
        var card = document.createElement('div');
        var flipper = document.createElement('div');
        var front = document.createElement('img');
        var back = document.createElement('img');
        card.id = cardObj.id;
        card.className = 'card';
        card.setAttribute('data-tid', 'Card');
        flipper.className = 'flipper';
        front.className = 'front';
        back.className = 'back';
        front.src = 'Img/Cards/' + cardObj.front + '.png';
        back.src = 'Img/' + cardObj.back + '.png';
        front.alt = 'Card ' + cardObj.id;
        back.alt = 'Back';
        flipper.appendChild(front);
        flipper.appendChild(back);
        card.appendChild(flipper);
        return card;
    };
    this.addCardsToDeck = function (array) {
        var self = this;
        setTimeout(function () {
            for (var i = 0; i < array.length; i++) {
                var card = self.createCard(array[i]);
                self.deck.appendChild(card);
            }
        }, 500);
    };
    this.removeCardsFromDesk = function (array) {
        var self = this;
        setTimeout(function () {
            for (var i = 0; i < array.length; i++) {
                var card = document.getElementById(array[i].id);
                self.deck.removeChild(card);
            }
        }, 280);
    };
    this.preloadContentImg = function(arrImg) {
        for (var i = 0; i < arrImg.length; i++) {
            var img = document.createElement('img');
            img.setAttribute('src', arrImg[i]);
            this.preloaded.appendChild(img);
        }
    };
    this.preloadContentSounds = function(arrSound, arrSoundName) {
          for (var i = 0; i < arrSound.length; i++) {
              var audio = document.createElement('audio');
              audio.setAttribute('src', arrSound[i]);
              audio.id = arrSoundName[i];
              audio.preload = 'auto';
              this.preloaded.appendChild(audio);
          }
    };
    this.removeControllerAudio = function() {
          this.screenGame.removeChild(this.controllerAudio);
    };
    this.changeState = function(alt, src) {
        this.controllerAudio.src = src;
        this.controllerAudio.alt  = alt;
    };
    this.playBackgroundMusic = function(sound, volume){
        this.backgroundAudio = document.getElementById(sound);
        if (!isNaN(this.backgroundAudio.duration)) {
            this.backgroundAudio.currentTime = 0;
        }
        this.backgroundAudio.play();
        this.backgroundAudio.volume = volume;
        this.backgroundAudio.loop = 'loop';
    };
    this.stopBackgroundMusic = function(vol, a) {
      var his = this;
        setTimeout(function(){
          (vol === 0) ? his.backgroundAudio.volume = vol : his.backgroundAudio.volume = vol - a;
        }, 450);
    };
    this.backgroundMusicOffOn = function(volume) {
        this.backgroundAudio.volume = volume;
    };
    this.playSound = function(sound) {
        sound = document.getElementById(sound);
        if (!isNaN(sound.duration)) {
            sound.currentTime = 0;
        }
        sound.volume = 0.5;
        sound.play();
    };
}

function Model() {
    this.cardsArray = ['0C', '0D', '0H', '0S', '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S',
        '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S',
        '9C', '9D', '9H', '9S', 'AC', 'AD', 'AH', 'AS', 'JC', 'JD', 'JH', 'JS', 'KC', 'KD', 'KH', 'KS',
        'QC', 'QD', 'QH', 'QS'];
    this.soundsArray = ['for button', 'Right', 'Ta-da', 'WalkinThePark', 'flippingback',
        'flipping', 'loose', 'Intro55', 'allcards'];
    this.cardBack = 'back';
    this.cardsPath = 'Img/Cards/';
    this.imgPath = 'Img/';
    this.imgFormat = 'png';
    this.soundsPath = 'Sounds/';
    this.soundsFormat = 'mp3';
    this.timeout5secID = 0;
    this.counterRight = 0;
    this.score = 0;
    this.currentCards = [];
    this.currenSelectedCards = [];
    this.timeFlipping = 5000;
    this.iconImgTrue = 'MusicYes';
    this.iconImgFalse = 'MusicNo';
    this.currentIconSrc = '';
    this.altForOff = 'Turn off';
    this.altForOn = 'Turn on';
    this.currentAlt = 'Turn off';
    this.browserVer = 0;
    this.maxVol = 0.03;
    this.forEndMutin = this.maxVol/3; //зависит от maxVol
    this.minVol = 0;
    this.currentVolume = 0.03;
    this.numOfPairs = 9;

    this.changeState = function(value) {
        if (value === this.altForOff) {
            this.currentAlt = this.altForOn;
            this.currentIconSrc = this.returnFalse();
            this.currentVolume = this.minVol;
        } else {
            this.currentAlt = this.altForOff;
            this.currentIconSrc = this.returnTrue();
            this.currentVolume = this.maxVol;
        }
    };

    this.returnFalse = function(){
      return this.imgPath + this.iconImgFalse + '.' + this.imgFormat;
    };
    this.returnTrue = function(){
        return this.imgPath + this.iconImgTrue + '.' + this.imgFormat;
    };
    this.preloadImg = function() {
        var array = [];
        for (var i = 0; i < this.cardsArray.length; i++) {
            array.push(this.cardsPath + this.cardsArray[i] + '.' + this.imgFormat);
        }
        array.push(this.imgPath + this.cardBack + '.' + this.imgFormat);
        return array;
    };
    this.preloadSounds = function() {
        var array = [];
        for (var i = 0; i < this.soundsArray.length; i++) {
            array.push(this.soundsPath + this.soundsArray[i] + '.' + this.soundsFormat);
        }
        return array;
    };
    this.flipFront = function(card) {
        card.flipped = false;
    };
    this.flipBack = function(card) {
        card.flipped = true;
    };
    this.changeActive = function(card) {
        card.active = false;
    };
    this.changeScore = function(value) {
        if (value) {
            this.counterRight += 1;
            this.score += (this.numOfPairs - this.counterRight) * 42;
        } else {
            this.score -= this.counterRight * 42;
        }
        return this.score;
    };
    this.pushToSelectedCards = function(card) {
        this.currenSelectedCards.push(card);
    };
    this.cleanSelectedCards = function() {
        this.currenSelectedCards.splice(0, 2);
    };
    this.compareCards = function() {
        return this.currenSelectedCards[0].front === this.currenSelectedCards[1].front && this.currenSelectedCards[0].id !== this.currenSelectedCards[1].id;
    };
    this.counterSelectedCards = function() {
        return this.currenSelectedCards.length;
    };
    this.compareRandom = function (a, b) {
        return Math.random() - 0.5;
    };
    this.initialCurrentCards = function() {
        var array = this.currentNames();
        for (var i = 0; i < array.length; i++){
            var card = new Card(array[i], this.cardBack, i);
            this.currentCards[i] = card;
        }
    };
    this.currentNames = function() {
        var halfArray = [];
        this.cardsArray.sort(this.compareRandom);
        for (var i = 0; i < this.numOfPairs; i++) {
            halfArray.push(this.cardsArray[i]);
        }
        return halfArray.concat(halfArray).sort(this.compareRandom);
    };
    this.resetScore = function() {
        this.score = 0;
        this.counterRight = 0;
    };
}

function Controller(model, view, audio) {
    this.view = view;
    this.model = model;

    this.main = function() {
        this.model.browserVer = this.browserVer();
        var self = this;
        this.view.preloadContentImg(this.model.preloadImg());
        this.view.buttonStart.addEventListener('click', this.buttonEvent.bind(this));
        this.view.buttonGame.addEventListener('click', this.buttonEvent.bind(this));
        this.view.buttonEnd.addEventListener('click', this.buttonEvent.bind(this));
        this.view.controllerAudio.addEventListener('click', this.controllerMusic.bind(this));
        this.preloadSounds();
        window.onload = function () {
            self.view.swap(self.view.screenLoading, self.view.screenStart);
            self.soundDelay('Intro55');
        };
    };
    this.buttonEvent = function(event) {
        var button = event.currentTarget;
        this.playSound('for button');
        this.enableButton(button);
        this.resetState(button);
        this.view.displayScore(this.model.score);
        this.view.changeScreens(button);
        this.model.initialCurrentCards();
        this.view.addCardsToDeck(this.model.currentCards);
        this.flippAllCardsBack();
    };
    this.mainCardFunction = function(event) {
        var card = event.currentTarget;
        var id = card.id;
        var self = this;
        this.chooseCard(id);
        if (this.model.counterSelectedCards() === 2) {
            var bol = this.model.compareCards();
            setTimeout(function() {
                self.changeScore(bol);
                self.actionWithACards(bol, self.model.currenSelectedCards);
                if (self.model.counterRight === this.model.numOfPairs) {
                    self.stopBackgroundMusic();
                    self.view.swap(self.view.screenGame, self.view.screenEnd);
                    self.view.gameEnd(self.model.score);
                    self.gameEndSound();
                }
            }, 500);
        }
    };
    this.controllerMusic = function(event) {
        var button = event.currentTarget;
        this.model.changeState(button.alt);
        this.view.changeState(this.model.currentAlt, this.model.currentIconSrc);
        this.backgroundMusicOffOn(this.model.currentVolume);
    };
    this.gameEndSound = function() {
        if (this.model.score <= 0) {
          this.soundDelay('loose');
        } else {
          this.soundDelay('Ta-da');
        }
    };
    this.backgroundMusicOffOn = function() {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.backgroundMusicOffOn(this.model.currentVolume);
    };
    this.stopBackgroundMusic = function() {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.stopBackgroundMusic(this.model.currentVolume, this.model.forEndMutin);
    };
    this.playSound = function(sound) {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.playSound(sound);
    };
    this.playBackgroundMusic = function(sound, volume) {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.playBackgroundMusic(sound, volume);
    };
    this.flippAllCardsBack = function() {
        var self = this;
        clearTimeout(this.model.timeout5secID);
        this.model.timeout5secID = setTimeout(function(){
            self.playSound('allcards');
            for (var i = 0; i < self.model.currentCards.length; i++) {
                var cardObj = self.model.currentCards[i];
                var cardEl = document.querySelectorAll('.card')[i];
                cardEl.addEventListener('click', self.mainCardFunction.bind(self));
                self.flippingBack(cardObj);
            }
        }, self.model.timeFlipping);
    };
    this.preloadSounds = function() {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9)) {
            this.view.preloadContentSounds(this.model.preloadSounds(), this.model.soundsArray);
        } else {
            this.view.removeControllerAudio();
        }
      };
    this.resetState = function (button){
        this.model.resetScore();
        if ((button === this.view.buttonGame) || (button === this.view.buttonEnd))
            this.view.removeCardsFromDesk(this.model.currentCards);
        if (button === this.view.buttonStart)
            this.playBackgroundMusic('WalkinThePark', this.model.currentVolume);
        if (button === this.view.buttonEnd) {
           this.backgroundMusicOffOn(this.model.currentVolume);
        }
    };
    this.chooseCard = function(id) {
        var cardObj = this.model.currentCards[id];
        var cardEl = document.getElementById(id);
        var flipped = cardObj.flipped;

        if ((flipped)&&(cardObj.active === true)) {
            this.model.flipFront(cardObj);
            this.view.flipFront(cardEl);
            this.model.pushToSelectedCards(cardObj);
            this.playSound('flipping');
        }
    };
    this.flippingBack = function(card) {
        var cardObj = card;
        var cardEl = document.getElementById(card.id);
        this.model.flipBack(cardObj);
        this.view.flipBack(cardEl);
    };
    this.rightCards = function(card) {
        var cardObj = card;
        var cardEl = document.getElementById(card.id);
        this.model.changeActive(cardObj);
        this.view.hideCard(cardEl);
    };
    this.actionWithACards = function(value, array) {
        if (value) {
            this.playSound('Right');
            for (var i = 0; i < array.length; i++) {
                this.rightCards(array[i]);
            }
        } else {
            this.playSound('flippingback');
            for (var i = 0; i < array.length; i++) {
                this.flippingBack(array[i]);
            }
        }
        this.model.cleanSelectedCards();
    };
    this.changeScore = function(value) {
        var score = this.model.changeScore(value);
        this.view.displayScore(score);
    };
    this.browserVer = function() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    };
    this.enableButton = function (button) {
        button.setAttribute('disabled', 'true');
        setTimeout(function () {
            button.removeAttribute('disabled');
        }, 1000);
    };
    this.soundDelay = function (sound) {
        var self = this;
        setTimeout(function() {
            self.playSound(sound)
        }, 400);
    };
}

var view = new View();
var model = new Model();
var controller = new Controller(model, view);
controller.main();
