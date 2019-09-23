import Rating from './rating';
export default class Registration {
  constructor() {
    this.name;
    this.chosenHead;
    this.chosenBody;
  }

  choosePlayer() {
    game.setAttribute('style', 'background-color: #c4e381;');

    let choiceOfPlayer = document.createElement('div');
    choiceOfPlayer.setAttribute('id', 'choiceOfPlayer');
    choiceOfPlayer.classList.add('choice_of_player');
    game.appendChild(choiceOfPlayer);

    let h1 = document.createElement('h1');
    h1.innerHTML = 'Choose your character:';
    choiceOfPlayer.appendChild(h1);

    let choiceOfHead = document.createElement('div');
    choiceOfHead.classList.add('choice_of_head');
    choiceOfPlayer.appendChild(choiceOfHead);

    let previousHead = document.createElement('span');
    previousHead.classList.add('controls');
    previousHead.innerHTML = '<i class="fa fa-chevron-circle-left"></i>';
    choiceOfHead.appendChild(previousHead);

    let head = document.createElement('div');
    head.classList.add('player_head');
    head.id = 1;
    head.setAttribute('style', `background-image: url('img/head_1.png');`)
    choiceOfHead.appendChild(head);

    let nextHead = document.createElement('span');
    nextHead.classList.add('controls');
    nextHead.innerHTML = '<i class="fa fa-chevron-circle-right"></i>';
    choiceOfHead.appendChild(nextHead);

    let choiceOfBody = document.createElement('div');
    choiceOfBody.classList.add('choice_of_body');
    choiceOfPlayer.appendChild(choiceOfBody);

    let previousBody = document.createElement('span');
    previousBody.classList.add('controls');
    previousBody.innerHTML = '<i class="fa fa-chevron-circle-left"></i>';
    choiceOfBody.appendChild(previousBody);

    let body = document.createElement('div');
    body.classList.add('player_body');
    body.id = 1;
    body.setAttribute('style', `background-image: url('img/body_1.png');`);
    choiceOfBody.appendChild(body);

    let nextBody = document.createElement('span');
    nextBody.classList.add('controls');
    nextBody.innerHTML = '<i class="fa fa-chevron-circle-right"></i>';
    choiceOfBody.appendChild(nextBody);

    let prevPart = 0;
    function changePartsOfBody(increment, partOfPlayerInDOM, partOfPlayer) {
      let currentPart = (4 + prevPart + increment) % 4;
      partOfPlayerInDOM.id = currentPart+1;
      partOfPlayerInDOM.setAttribute('style', `background-image: url('img/${partOfPlayer}_${currentPart+1}.png');`);
      prevPart = currentPart;
    }

    previousHead.onclick = function () {
      changePartsOfBody(-1, head, 'head');
    };

    nextHead.onclick = function () {
      changePartsOfBody(1, head, 'head');
    };

    previousBody.onclick = function () {
      changePartsOfBody(-1, body, 'body');
    };

    nextBody.onclick = function () {
      changePartsOfBody(1, body, 'body');
    };
  }

  buildRegistration() {
    let usersForm = document.createElement('form');
    usersForm.classList.add('users_form');
    choiceOfPlayer.appendChild(usersForm);

    let usersName = document.createElement('input');
    usersName.setAttribute('id', 'usersName');
    usersName.setAttribute('type', 'text');
    let labelForName = document.createElement('label');
    labelForName.setAttribute('for', 'usersName');
    labelForName.innerHTML = 'Enter your name:';

    usersForm.appendChild(labelForName);
    usersForm.appendChild(usersName);

    let buttonNewGame = document.createElement('button');
    buttonNewGame.setAttribute('id', 'play_game');
    buttonNewGame.classList.add('play_button');
    buttonNewGame.innerHTML = 'Play';
    buttonNewGame.setAttribute('type', 'submit');
    usersForm.appendChild(buttonNewGame);

    let buttonRating = document.createElement('button');
    buttonRating.setAttribute('id', 'buttonRating');
    buttonRating.classList.add('rating_button');
    buttonRating.innerHTML = 'Watch rating';
    usersForm.appendChild(buttonRating);

    buttonRating.onclick = function (event) {
      event.preventDefault();
      let rating = new Rating;
      rating.createPopupWindow();
      rating.createRatingTable();
    }
  }

  initialize() {
    this.choosePlayer();
    this.buildRegistration();
  }
}
