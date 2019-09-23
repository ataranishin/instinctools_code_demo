(function (window) {
  var deck = [
          {
            id : 1,
            img: "images/monsters-01.png"
          },
          {
            id : 2,
            img: "images/monsters-02.png"
          },
          {
            id : 3,
            img: "images/monsters-03.png"
          },
          {
            id : 4,
            img: "images/monsters-04.png"
          },
          {
            id : 5,
            img: "images/monsters-05.png"
          },
          {
            id : 6,
            img: "images/monsters-06.png"
          },
          {
            id : 7,
            img: "images/monsters-07.png"
          },
          {
            id : 8,
            img: "images/monsters-08.png"
          },
          {
            id : 9,
            img: "images/monsters-09.png"
          }
        ];
  function shuffle(arr) {
    for(var j, temp, i=arr.length; i; j=parseInt(Math.random()*i),temp=arr[--i],arr[i]=arr[j],arr[j]=temp);
    return arr;
  }
  function Board(deck) {
    this._init();
  }
  Board.prototype.onGameStart = function() {
    return false;
  }
  Board.prototype.onGameEnd = function() {
    return false;
  }
  Board.prototype._init = function() {
    this.game = document.createElement("div");
    this.game.id = "match-match";
    this.game.className = "match-match";
    document.getElementById("match-game").appendChild(this.game);
    this.gameMeta = document.createElement("div");
    this.gameMeta.className = "clear";
    this.gameMeta.id = "clear";
    this.gameStartScreen = document.createElement("div");
    this.gameStartScreen.id = "start-screen";
    this.gameStartScreen.className = "start-screen";
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.id = "wrapper-game";
    this.gameWrapper.className = "wrapper-game";
    this.gameContents = document.createElement("div");
    this.gameContents.id = "contents-game";
    this.gameWrapper.appendChild(this.gameContents);
    this.gameMessages = document.createElement("div");
    this.gameMessages.id = "win-message";
    this.gameMessages.className = "win-message";
    this._setupGame();
  };
  Board.prototype._setupGame = function() {
    var self=this;
    this.gameState = 1;
    this.cards = shuffle(deck);
    this.card1 = "";
    this.card2 = "";
    this.card1id = "";
    this.card2id = "";
    this.card1flipped = false;
    this.card2flipped = false;
    this.flippedTiles = 0;
    this.chosenLevel = "";
    this.numMoves = 0;
    this.level = document.createElement('div');
    this.level.className = 'counter';
    this.counterLevel = document.createElement('span');
    this.counterLevel.className = "counter-level";
    this.counterLevelText = document.createTextNode("Level:");
    this.counterLevel.appendChild(this.counterLevelText);
    this.chosenLevelSpan = document.createElement('span');
    this.chosenLevelSpan.id = "counter-level";
    this.chosenLevelText = document.createTextNode(this.chosenLevel);
    this.chosenLevelSpan.appendChild(this.chosenLevelText);
    this.counterLevel.appendChild(this.chosenLevelSpan);
    this.moves = document.createElement("span");
    this.moves.className = "moves";
    this.movesText = document.createTextNode("Moves:");
    this.moves.appendChild(this.movesText);
    this.numMovesSpan = document.createElement("span");
    this.numMovesSpan.id = "moves";
    this.numMovesText = document.createTextNode(this.numMoves);
    this.numMovesSpan.appendChild(this.numMovesText);
    this.moves.appendChild(this.numMovesSpan);
    this.level.appendChild(this.counterLevel);
    this.level.appendChild(this.moves);
    this.restartGame = document.createElement('div');
    this.restartGame.className = "restart-game";
    this.restartGame.id = "restart-game";
    this.buttonRestart = document.createElement("button");
    this.buttonRestart.id = "button-restart";
    this.buttonRestart.className = "turn-button";
    this.buttonRestartText = document.createTextNode("Try again");
    this.buttonRestart.appendChild(this.buttonRestartText);
    this.restartGame.appendChild(this.buttonRestart);

    this.gameStartScreenHeading = document.createElement("h2");
    this.gameStartScreenHeading.className =  "start-screen-heading";
    this.gameStartScreenText = document.createTextNode("Its my match-match game");
    this.gameStartScreenHeading.appendChild(this.gameStartScreenText);

    this.gameRules = document.createElement("p");
    this.gameRules.className = "game-rules";
    this.gameRulesText = document.createTextNode("Flip the tiles and try to match them up in pairs. Pair up all the tiles to win. Try to complete the game in as few moves as possible!")
    this.gameRules.appendChild(this.gameRulesText);

    this.levelSelect = document.createElement("h3");
    this.levelSelect.className = "sub-heading";
    this.levelSelectText = document.createTextNode("Select level");
    this.levelSelect.appendChild(this.levelSelectText);

    this.levelSelectList = document.createElement("ul");
    this.levelSelectList.className = "level-select";
    this.levelOne = document.createElement('li');
    this.levelTwo = document.createElement('li');
    this.levelOneSpan = document.createElement("span");
    this.levelTwoSpan = document.createElement("span");
    this.levelOneSpanText=document.createTextNode("Level 1");
    this.levelTwoSpanText=document.createTextNode("Level 2");
    this.levelOneSpan.appendChild(this.levelOneSpanText);
    this.levelTwoSpan.appendChild(this.levelTwoSpanText);
    this.levelOne.appendChild(this.levelOneSpan);
    this.levelTwo.appendChild(this.levelTwoSpan);
    this.levelOneSpan.setAttribute("data-level",1);
    this.levelTwoSpan.setAttribute("data-level",2);
    this.levelSelectList.appendChild(this.levelOne);
    this.levelSelectList.appendChild(this.levelTwo);

    this.gameStartScreen.appendChild(this.gameStartScreenHeading);
    this.gameStartScreen.appendChild(this.gameRules);
    this.gameStartScreen.appendChild(this.levelSelect);
    this.gameStartScreen.appendChild(this.levelSelectList);
    this.gameMeta.appendChild(this.level);
    this.gameMeta.appendChild(this.restartGame);
    this.game.appendChild(this.gameMeta);
    this.game.appendChild(this.gameStartScreen);

    document.getElementById("button-restart").addEventListener("click",
      function(e) {
        self.resetGame();
      }
    );
    this._startScreenEvents();
  }
  Board.prototype._startScreenEvents= function () {
    var levelsNodes=this.gameStartScreen.querySelectorAll("ul.level-select span");
    for(var i=0, len=levelsNodes.length; i < len; i++) {
      var levelNode=levelsNodes[i];
      this._startScreenEventsHandler(levelNode);
    }
  }
  Board.prototype._startScreenEventsHandler= function(levelNode) {
    var self=this;
    levelNode.addEventListener("click",function(e){
    if(self.gameState==1) {
      self._setupGameWrapper(this);
    }
    })
  }
  Board.prototype._setupGameWrapper= function(levelNode) {
    this.level= levelNode.getAttribute("data-level");
    this.game.removeChild(this.gameStartScreen);
    this.gameContents.className= "contents-game level-"+this.level;
    this.game.appendChild(this.gameWrapper);
    this._renderTiles();
  }
  Board.prototype._renderTiles=function() {
    this.gridX = this.level * 2 + 2;
    this.gridY = this.gridX / 2;
    this.numTiles = this.gridX * this.gridY;
    this.halfNumTiles = this.numTiles/2;
    this.tilesHTML='';
    this.newCards = [];
    for(var i= 0;i<this.halfNumTiles;i++) {
      this.newCards.push(this.cards[i],this.cards[i]);
    }
    this.newCards = shuffle(this.newCards);
    for(var i =0;i<this.numTiles;i++) {
      var n=i+1;
      this.tilesHTML = document.createElement("div");
      this.tilesHTML.className = "tile tile-" + n;
      this.tileInner = document.createElement("div");
      this.tileInner.className="tile-inner";
      this.tileInside = document.createElement("span");
      this.tileInside.className = "tile-inside";
      this.tileOutside = document.createElement("span");
      this.tileOutside.className = "tile-outside";
      this.tileInner.appendChild(this.tileOutside);
      this.tileInner.setAttribute("data-id",this.newCards[i].id);
      this.tileInside = document.createElement("span");
      this.tileInside.className = "tile-inside";
      this.tileInsideImg = document.createElement("img");
      this.tileInsideImg.src = this.newCards[i].img;
      this.tileInside.appendChild(this.tileInsideImg);
      this.tileInner.appendChild(this.tileInside);
      this.tilesHTML.appendChild(this.tileInner);
      this.gameContents.appendChild(this.tilesHTML);
    }
    this.gameState = 2;
    this.onGameStart();
    this._gamePlay();
  }
  Board.prototype._gamePlay=function() {
    var tile=document.querySelector(".contents-game");
    this._gamePlayEvents(tile);
  }
  Board.prototype._gamePlayEvents = function(tile) {
    var self = this;
    tile.addEventListener("click", function(e) {
      this.targetTile = e.target.closest(".tile-inner");
      if(!this.targetTile.classList.contains("flipped")) {
        if(self.card1flipped === false && self.card2flipped === false) {
          this.targetTile.classList.add("flipped");
          self.card1 = this.targetTile;
          self.card1id = this.targetTile.getAttribute("data-id");
          self.card1flipped=true;
        }
        else if(self.card1flipped === true && self.card2flipped === false ) {
          this.targetTile.classList.add("flipped");
          self.card2 = this.targetTile;
          self.card2id = this.targetTile.getAttribute("data-id");
          self.card2flipped = true;
          if(self.card1id == self.card2id) {
            self._gameCardsMatch();
            self.card1.classList.add("hide");
            self.card2.classList.add("hide");
          }
          else {
            self._gameCardsMismatch();
          }
        }
      }
    });
  }
  Board.prototype._gameCardsMatch = function() {
    var self = this;
    window.setTimeout(function(){
      self.card1.classList.add("correct");
      self.card2.classList.add("correct");
    }, 300);
    window.setTimeout( function(){
      self.card1.classList.remove("correct");
      self.card2.classList.remove("correct");
      self._gameResetVars();
      self.flippedTiles = self.flippedTiles + 2;
      if (self.flippedTiles == self.numTiles) {
        self._winGame();
      }
    },1500);
    this._gameCounterPlusOne();
  };
  Board.prototype._gameCardsMismatch = function() {
    var self = this;
    window.setTimeout(function(){
      self.card1.classList.remove("flipped");
      self.card2.classList.remove("flipped");
      self._gameResetVars();
    }, 900);
    this._gameCounterPlusOne();
  };
  Board.prototype._gameResetVars = function() {
    this.card1 = "";
    this.card2 = "";
    this.card1id = "";
    this.card2id = "";
    this.card1flipped = false;
    this.card2flipped = false;
  }
  Board.prototype._gameCounterPlusOne = function() {
    this.numMoves += 1;
    this.moveCounterUpdate = document.getElementById("moves");
    this.moveCounterUpdate.textContent = this.numMoves;
  };
  Board.prototype._winGame = function() {
    var self = this;
    if(this.onGameEnd() === false) {
      this._clearGame();
      this.gameMessagesHeading = document.createElement("h2");
      this.gameMessagesHeading.className = "message-heading";
      this.gameMessagesText = document.createTextNode("Congratulate!");
      this.gameMessagesHeading.appendChild(this.gameMessagesText);
      this.winMessage = document.createElement("p");
      this.winMessage.className = "message";
      this.winMessageText = document.createTextNode("You won the round in " + this.numMoves + "  moves. Go you.")
      this.winMessage.appendChild(this.winMessageText);
      this.buttonMessageRestart = document.createElement("button");
      this.buttonMessageRestart.id = "message-restart";
      this.buttonMessageRestart.className = "turn-button";
      this.buttonMessageRestartText = document.createTextNode("Play again?");
      this.buttonMessageRestart.appendChild(this.buttonMessageRestartText);
      this.gameMessages.appendChild(this.gameMessagesHeading);
      this.gameMessages.appendChild(this.winMessage);
      this.gameMessages.appendChild(this.buttonMessageRestart);
      this.game.appendChild(this.gameMessages);
      document.getElementById("message-restart").addEventListener("click", function(e) {
        self.resetGame();
      });
    }else {
      self.onGameEnd();
    }
  }
  Board.prototype._clearGame = function() {
    while(this.gameStartScreen.firstChild) {
      this.gameStartScreen.removeChild(this.gameStartScreen.firstChild);
    }
    while(this.gameMessages.firstChild) {
      this.gameMessages.removeChild(this.gameMessages.firstChild);
    }
    while(this.gameMeta.firstChild) {
      this.gameMeta.removeChild(this.gameMeta.firstChild);
    }
    while(this.game.firstChild) {
      this.game.removeChild(this.game.firstChild);
    }
  }
  Board.prototype.startGame = function() {
    this._setupGame();
  }
  Board.prototype.resetGame = function() {
    this._clearGame();
    this._setupGame();
  };
  window.Board = Board;
})(window);

/*


## Про делегирование событий

        У тебя на каждую катрочку навешен обработчик:

                for( var i =0, len=tiles.length;i<len;i++) {
                    var tile=tiles[i];
                    this._gamePlayEvents(tile);
                }

        Почитай тут как стоит делать это правильно https://learn.javascript.ru/event-delegation
        Это очень нужная практика и очень часто используется.
        В данном случае ее использование так и напрашивается.



## Про безопасность
        Посмотри файл Cheet.jpg
        Я вижу, где какая картинка лежит и могу с первого раза все угадать (подсмотреть в испекторе data-id="X").
        Это довольно редкая ошибка. Обычно абсолютно не важно, что находится в консоли, но при геймдеве - это важно.
        Важно, чтобы картинка под рубашкой аппендилась в DOM только после нажатия на карточку, чтобы не было возможности ее подсмотреть заранее.
        Важно, чтобы массив карточек в объекте игры был приватным полем (в твоем случае, такого массива нет вообще, ты работаешь через DOM,
        что в общем-то и позволяет читить).

        https://learn.javascript.ru/internal-external-interface

        Так же это может пригодиться, когда надо скрыть какую-либо инфу от пользователя или хакера.
        Например пароли, логины, коммерческую информацию заказчика и т.д.

        Обрати на это внимание!



## Про innerHTML
        Это очень трудозатратная и небезопасная операция. Поищи сам про это информацию.
        Пользуйся appendChild в большинстве случаев.
*/

/*
    Работа не плохая.
    Все требования выполнены.
    Верстка в норме. Код не очень красиво офомлен, но исплользованы хорошия практики для JS кодинга, такие как
    закрытый скоуп всего кода через самовызывающуюся функцию, инициализация параметрами по умолчанию и т.д.
    Ставлю оценку 90.
*/
