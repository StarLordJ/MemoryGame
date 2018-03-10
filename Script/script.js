function Card(frontName, back, id) {
    this.front = frontName;
    this.back = back;
    this.flipped = false;
    this.id = id;
    this.active = true;
}

function View() { //вся работа с DOM-деревом
    this.app = document.querySelector('.app');
    this.screenLoading = document.querySelector('.loading');
    this.screenStart = document.querySelector('.screenStart');
    this.screenGame = document.querySelector('.screenGame');
    this.screenEnd = document.querySelector('.screenEnd');
    this.buttonStart = document.querySelector('.screenStart__button');
    this.buttonGame = document.querySelector('.gameMenu__button');
    this.buttonEnd = document.querySelector('.screenEnd__button');
    this.deck = document.querySelector('.cardDeck');
    this.preloaded = document.querySelector('.preloadContent');
    this.screenEndText = document.querySelector('.screenEnd__text');
    this.screenEndScore = document.querySelector('.screenEnd__scoreValue');
    this.screenScore = document.querySelector('.gameMenu__value');
    this.controlFooter = document.querySelector('.musicControls');
    this.controlAudio = document.querySelector('.musicControls__audio');
    this.controlSounds = document.querySelector('.musicControls__sounds');
    this.backgroundAudio = '';
    this.animationTime = 300; //зависит от css
    this.body = document.getElementsByTagName('body')[0];


    this.changeScreens = function (button) {
        if (button.className === this.buttonStart.className)
            this.swap(this.screenStart, this.screenGame);
        if (button.className === this.buttonGame.className)
            this.swap(this.deck, this.deck);
        if (button.className === this.buttonEnd.className)
            this.swap(this.screenEnd, this.screenGame);
    };
    this.swap = function (screen1, screen2) {
        this.fixOverflow();
        this.hide(screen1);
        this.show(screen2);
    };
    this.hide = function (element) {
        this.fade(element, 'is-displayed', 'hide');
    };
    this.show = function (element) {
        setTimeout(this.fade.bind(this, element, 'is-displayed', 'show'), this.animationTime * 1.5);
    };
    this.fade = function (element, display, animate) {
        element.classList.add(animate);
        if (element.classList.contains(display)) {
            setTimeout(function () {
                element.classList.remove(display);
                element.classList.remove(animate);
            }, this.animationTime - 10);
        }
        else {
            element.classList.add(display);
            setTimeout(function () {
                element.classList.remove(animate);
            }, this.animationTime + 10);
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
        card.classList.remove('is-flipped');
        card.setAttribute('data-tid', 'Card');
    };
    this.flipBack = function (card) {
        card.classList.add('is-flipped');
        card.setAttribute('data-tid', 'Card-flipped');
    };
    this.hideCard = function(card) {
        this.fade(card, 'is-hidden', 'hide');
        card.removeAttribute('data-tid');
    };
    this.displayScore = function(score) {
        this.screenScore.innerText = score;
    };
    this.createCard = function (cardObj) {
        var card = document.createElement('div');
        var front = document.createElement('img');
        var back = document.createElement('img');
        card.id = cardObj.id;
        card.className = 'card';
        card.setAttribute('data-tid', 'Card');
        front.className = 'card__front';
        back.className = 'card__back';
        front.src = 'Img/Cards/' + cardObj.front + '.png';
        back.src = 'Img/' + cardObj.back + '.png';
        front.alt = 'Card ' + cardObj.id;
        back.alt = 'Back';
        card.appendChild(front);
        card.appendChild(back);
        return card;
    };
    this.addCards = function (array) {
        setTimeout(this.fillDeck.bind(this, array), this.animationTime * 1.6);
    };
    this.fillDeck = function (array) {
      for (var i = 0; i < array.length; i++) {
          var card = this.createCard(array[i]);
          this.deck.appendChild(card);
        }
    };
    this.removeCards = function () {
        setTimeout(this.clearDeck.bind(this), this.animationTime - 20);
    };
    this.clearDeck = function() {
        this.deck.innerText = '';
    }
    this.preloadImg = function(arrImg) {
        for (var i = 0; i < arrImg.length; i++) {
            var img = document.createElement('img');
            img.setAttribute('src', arrImg[i]);
            this.preloaded.appendChild(img);
        }
    };
    this.preloadSounds = function(arrSound, arrSoundName) {
          for (var i = 0; i < arrSound.length; i++) {
              var audio = document.createElement('audio');
              audio.setAttribute('src', arrSound[i]);
              audio.id = arrSoundName[i];
              audio.preload = 'auto';
              this.preloaded.appendChild(audio);
          }
    };
    this.removecontrolAudio = function() {
          this.screenGame.removeChild(this.controlFooter);
    };
    this.changeState = function(button, alt, src) {
        if (button === this.controlAudio) {
            this.controlAudio.src = src;
            this.controlAudio.alt  = alt;
        } else {
            this.controlSounds.src = src;
            this.controlSounds.alt = alt
        }
    };
    this.playMusic = function(sound, volume){
        this.backgroundAudio = document.getElementById(sound);
        if (!isNaN(this.backgroundAudio.duration)) {
            this.backgroundAudio.currentTime = 0;
        }
        this.backgroundAudio.play();
        this.backgroundAudio.volume = volume;
        this.backgroundAudio.loop = 'loop';
    };
    this.muteMusic = function(vol, a) {
        (vol === 0) ? this.backgroundAudio.volume = vol : this.backgroundAudio.volume = vol - a;
    };
    this.musicSetVolume = function(volume) {
        this.backgroundAudio.volume = volume;
    };
    this.playSound = function(sound, vol) {
        sound = document.getElementById(sound);
        if (!isNaN(sound.duration)) {
            sound.currentTime = 0;
        }
        sound.volume = vol;
        sound.play();
    };
    this.fixOverflow = function() {
        var that = this;
        this.body.classList.add('fixoveflow');
        setTimeout(this.removeClass.bind(this), that.animationTime * 2.5);
    };
    this.removeClass = function () {
        this.body.classList.remove('fixoveflow');
    };
}

function Model() { //все данные игры, которые можно настраивать по своему желанию
    this.cardsArray = ['0C', '0D', '0H', '0S', '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S',
        '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S',
        '9C', '9D', '9H', '9S', 'AC', 'AD', 'AH', 'AS', 'JC', 'JD', 'JH', 'JS', 'KC', 'KD', 'KH', 'KS',
        'QC', 'QD', 'QH', 'QS'];
    this.soundsArray = ['button', 'Right', 'win', 'WalkinThePark', 'flipback',
        'flipfront', 'loose', 'Intro', 'allcardsFlipback'];
    this.cardBack = 'back';
    this.cardsPath = 'Img/Cards/';
    this.imgPath = 'Img/';
    this.imgFormat = 'png';
    this.soundsPath = 'Sounds/';
    this.soundsFormat = 'mp3';
    this.timeout5secID = 0;
    this.counterRight = 0;
    this.score = 0;
    this.numOfPairs = 9;
    this.currentCards = [];
    this.selectedCards = [];
    this.timeFlipping = 5000;
    this.iconMusicYes = 'MusicYes';
    this.iconMusicNo = 'MusicNo';
    this.iconSoundsYes = 'VolumeOn';
    this.iconSoundsNo = 'VolumeOff';
    this.musicSrc = '';
    this.soundsSrc = '';
    this.altOff = 'Turn off';
    this.altOn = 'Turn on';
    this.musicAlt = 'Turn off';
    this.soundsAlt = 'Turn off';
    this.browserVer = 0;
    this.maxVolMusic = 0.05;
    this.maxVolSounds = 0.5
    this.endMute = this.maxVolMusic/2; //зависит от maxVol
    this.minVol = 0;
    this.musicVolume = 0.05;
    this.soundsVolume = 0.5;

    this.changeStateOfbackgroundController = function(value) {
        if (value === this.altOff) {
            this.musicAlt = this.altOn;
            this.musicSrc = this.imgPath + this.iconMusicNo + '.' + this.imgFormat;
            this.musicVolume = this.minVol;
        } else {
            this.musicAlt = this.altOff;
            this.musicSrc = this.imgPath + this.iconMusicYes + '.' + this.imgFormat;
            this.musicVolume = this.maxVolMusic;
        }
    };
    this.changeStateOfSoundsController = function(value) {
        if (value === this.altOff) {
            this.soundsAlt = this.altOn;
            this.soundsSrc = this.imgPath + this.iconSoundsNo + '.' + this.imgFormat;
            this.soundsVolume = this.minVol;
        } else {
            this.soundsAlt = this.altOff;
            this.soundsSrc = this.imgPath + this.iconSoundsYes + '.' + this.imgFormat;
            this.soundsVolume = this.maxVolSounds;
        }
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
        this.selectedCards.push(card);
    };
    this.cleanSelectedCards = function() {
        this.selectedCards.splice(0, 2);
    };
    this.compareCards = function() {
        return this.selectedCards[0].front === this.selectedCards[1].front && this.selectedCards[0].id !== this.selectedCards[1].id;
    };
    this.counterSelectedCards = function() {
        return this.selectedCards.length;
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
    this.currentNames = function() { //возвращает удвоенный массив с перемешанными именами изображений карт
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
    this.resetSelectedCards = function() {
      this.selectedCards = [];
    };
    this.resetCurrentCards = function() {
        this.currentCards = [];
    };
}

function Controller(model, view) { //основная логика игры и связывание модели с представлением
    this.view = view;
    this.model = model;

/*---------------------------первый запуск приложения. навешивание событий на элементы ----------------------------*/
    this.main = function() {
        this.model.browserVer = this.browserVer();
        this.view.preloadImg(this.model.preloadImg());
        this.view.buttonStart.addEventListener('click', this.buttonEvent.bind(this));
        this.view.buttonGame.addEventListener('click', this.buttonEvent.bind(this));
        this.view.buttonEnd.addEventListener('click', this.buttonEvent.bind(this));
        this.view.controlAudio.addEventListener('click', this.controlMusic.bind(this));
        this.view.controlSounds.addEventListener('click', this.controlMusic.bind(this));
        this.preloadSounds();
        window.onload = this.gameFadeIn();
    };
    this.gameFadeIn = function() {
        this.view.swap(this.view.screenLoading, this.view.screenStart);
        this.soundDelay('Intro');
    };
    this.buttonEvent = function(event) {
        var button = event.currentTarget;
        this.playSound('button');
        this.freezeButton(button);
        this.resetState(button);
        this.view.displayScore(this.model.score);
        this.view.changeScreens(button);
        this.model.initialCurrentCards();
        this.view.addCards(this.model.currentCards);
        this.flipCards();
    };
    this.mainCardFunction = function(event) {
        var card = event.currentTarget.parentNode;
        var id = card.id;
        this.chooseCard(id);
        if (this.model.counterSelectedCards() === 2) {
            var bol = this.model.compareCards();
            setTimeout(this.actionWithTwoCards.bind(this, bol), this.view.animationTime * 1.5);
        }
    };
    this.actionWithTwoCards = function(value) {
        this.changeScore(value);
        this.actionWithACards(value, this.model.selectedCards);
        if (this.model.counterRight === this.model.numOfPairs) {
            this.muteMusic();
            this.view.swap(this.view.screenGame, this.view.screenEnd);
            this.view.gameEnd(this.model.score);
            this.gameEndSound();
        }
    };
    this.controlMusic = function(event) {
        var button = event.currentTarget;
        if (button === this.view.controlAudio) {
            this.model.changeStateOfbackgroundController(button.alt);
            this.view.changeState(button, this.model.musicAlt, this.model.musicSrc);
            this.musicSetVolume(this.model.musicVolume);
        } else if (button === this.view.controlSounds) {
            this.model.changeStateOfSoundsController(button.alt);
            this.view.changeState(button, this.model.soundsAlt, this.model.soundsSrc);
        }
    };
/*----------------------------------------вспомогательные функции для работы с аудио------------------------------------------------------*/
    this.soundDelay = function (sound) {
        setTimeout(this.playSound.bind(this, sound), this.view.animationTime * 1.5);
    };
    this.gameEndSound = function() {
        if (this.model.score <= 0) {
          this.soundDelay('loose');
        } else {
          this.soundDelay('win');
        }
    };
    // Функции ниже определяют версию браузера, и если это не IE8 или ниже, вызывают метды представления
    this.musicSetVolume = function() {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.musicSetVolume(this.model.musicVolume);
    };
    this.muteMusic = function() {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.muteMusic(this.model.musicVolume, this.model.endMute);
    };
    this.playSound = function(sound) {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.playSound(sound, this.model.soundsVolume);
    };
    this.playMusic = function(sound, volume) {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9))
            this.view.playMusic(sound, volume);
    };
    this.preloadSounds = function() {
        if (!(this.model.browserVer > -1 && this.model.browserVer < 9)) {
            this.view.preloadSounds(this.model.preloadSounds(), this.model.soundsArray);
        } else {
            this.view.removecontrolAudio();
        }
      };

/*-----------------------------------------вспомогательные функции для работы с картами ---------------------------------------------------*/
    this.flipCards = function() { //функция поворачивает  все карты рубашкой вверх через 5 секунд после появления
        clearTimeout(this.model.timeout5secID);
        this.model.timeout5secID = setTimeout(this.flipp.bind(this), this.model.timeFlipping);
    };

    this.flipp = function() {
        this.playSound('allcardsFlipback');
        for (var i = 0; i < this.model.currentCards.length; i++) {
            var cardObj = this.model.currentCards[i];
            var cardEl = document.querySelectorAll('.card__back')[i]; //подключаем событие  к задней части карты, т.к нам нужно её перевернуть и повторные клики не страшны
            cardEl.addEventListener('click', this.mainCardFunction.bind(this));
            this.flipBack(cardObj);
        }
    };

    this.chooseCard = function(id) { //функция поворачивает картту рубашкой вниз, записывает данные карты в массив
        var cardObj = this.model.currentCards[id];
        var cardEl = document.getElementById(id);
        var flipped = cardObj.flipped;

        if ((flipped) && (cardObj.active)) {
            this.model.flipFront(cardObj);
            this.view.flipFront(cardEl);
            this.model.pushToSelectedCards(cardObj);
            this.playSound('flipfront');
        }
    };
    this.flipBack = function(card) { //функция поворачивает карту рубашкой вверх
        var cardObj = card;
        var cardEl = document.getElementById(card.id);
        this.model.flipBack(cardObj);
        this.view.flipBack(cardEl);
    };
    this.rightCards = function(card) { //функция прячет карту
        var cardObj = card;
        var cardEl = document.getElementById(card.id);
        this.model.changeActive(cardObj);
        this.view.hideCard(cardEl);
    };
    this.actionWithACards = function(value, array) { //как только массив выбранных карт заполняется на 2 карты, вызывается эта функция и начинает думать, что с картами делать
        if (value) {
            this.playSound('Right');
            for (var i = 0; i < 2; i++) { //указано 2, а не array.length, потому что иначе можно успеть нажать на третью карту и с ней произойдёт то же самое, что и с двумя.
                this.rightCards(array[i]);
            }
        } else {
            this.playSound('flipback');
            for (var i = 0; i < 2; i++) {
                this.flipBack(array[i]);
            }
        }
        this.model.cleanSelectedCards();
    };

/*-----------------------------------------------остальное +вспомогательные ф-ции -------------------------------------------------*/
    this.resetState = function (button) {
        this.model.resetScore();
        this.model.resetSelectedCards();
        this.model.resetCurrentCards();
        if ((button === this.view.buttonGame) || (button === this.view.buttonEnd))
            this.view.removeCards();
        if (button === this.view.buttonStart)
            this.playMusic('WalkinThePark', this.model.musicVolume);
        if (button === this.view.buttonEnd) {
           this.musicSetVolume(this.model.musicVolume);
        }
    };
    this.changeScore = function(value) {
        var score = this.model.changeScore(value);
        this.view.displayScore(score);
    };
    this.browserVer = function() { //определяем версию IE
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    };
    this.freezeButton = function (button) { //функция, которая блокирует кнопку на определённое время. т.к. если нажимать на неё быстро - карты не успевают замениться
        button.setAttribute('disabled', 'true');
        setTimeout(function () {
            button.removeAttribute('disabled');
        }, this.view.animationTime * 3);
    };

}

var view = new View();
var model = new Model();
var controller = new Controller(model, view);
controller.main();
