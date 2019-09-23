import Attack from './../attack';
import Congratulation from './../congrats';
import Explosion from './../explosion';
import Skills from './../skills';
export default class MatchingWords {
  constructor() {
    this.words = [];
    this.translates = [];
    this.shuffledArr = []
  }
  buildTask() {
    let task = document.createElement('div');
    task.id = 'task';
    task.classList.add('global_wrap');
    task.classList.add('grid');
    game.appendChild(task);

    let title = document.createElement('h1');
    title.innerHTML = 'Match the words';
    task.appendChild(title);

    while (this.words.length !== 5) {
      let randomNumber = Math.floor(Math.random()*(vocabulary.length));
      if (this.words.indexOf(vocabulary[randomNumber].word) === -1) {
        this.words.push(vocabulary[randomNumber].word);
        this.translates.push(vocabulary[randomNumber].translate);
        this.shuffledArr.push(vocabulary[randomNumber].translate);
      }
    }

    function shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    shuffle(this.shuffledArr);

    let container = document.createElement('div');
    container.style.display = 'flex';
    task.appendChild(container);

    let listOfWords = document.createElement('ul');
    listOfWords.setAttribute('id', 'listOfWords');
    listOfWords.classList.add('listOfWordsToMatch');
    container.appendChild(listOfWords);

    for (let i = 0; i < 5; i++) {
      let liWithWord = document.createElement('li');
      liWithWord.innerHTML = this.words[i];
      listOfWords.appendChild(liWithWord);
    }

    let listOfTranslate = document.createElement('ul');
    listOfTranslate.setAttribute('id', 'listOfTranslate');
    listOfTranslate.classList.add('listOfWordsToMatch');
    container.appendChild(listOfTranslate);

    for (let i = 0; i < 5; i++) {
      let liWithTranslate = document.createElement('li');
      liWithTranslate.innerHTML = this.shuffledArr[i][0];
      listOfTranslate.appendChild(liWithTranslate);
    }

    $(function() {
        $( "#listOfTranslate" ).sortable();
        $( "#listOfTranslate" ).disableSelection();
      });

    let button = document.createElement('button');
    button.setAttribute('value', 'submit');
    button.innerHTML = 'answer';
    button.classList.add('submit_task');
    button.classList.add('drag_n_drop_button');
    task.appendChild(button);

    let translates = this.translates;
    button.onclick = function () {
      event.preventDefault();
      let arr = Array.from(document.getElementsByTagName('li'));
      let answer;

      for (let i = 0; i < 5; i++) {
        if (arr[i+5].innerHTML === translates[i][0]) {
          answer = true;
        } else {
          answer = false;
        }
      }

      let enemyAttack = new Attack();
      let skills = new Skills();
      if (answer) {
        let congrats = new Congratulation();
        congrats.createCongratulations();

        let attack = new Attack();
        setTimeout(function () {
          attack.buidAttack('player');
        }, 2000);

        let lostLifeArr = lifeOfEnemy.innerHTML.split(/\//g);
        lifeOfEnemy.innerHTML = `${lostLifeArr[0] - 20}/100`;
        lifeOfEnemy.setAttribute('style', `background-position: ${(-368 + (100 - (lostLifeArr[0] - 20)) * 3.5)}px -57px;`);

        if (lostLifeArr[0] - 20 === 0) {
          let explosion = new Explosion('enemy');
          setTimeout(function () {
            explosion.buidExplosion();
          }, 3000);
        } else {
          setTimeout(function () {
            enemyAttack.buidAttack('enemy');
          }, 4000);
          if (playerBody) {
            setTimeout(function () {
              skills.buildSkills();
              skills.addEventsOnSkills();
            }, 6000);
          }
        }
      } else {
        let attack = new Attack();
        attack.buidAttack('player');
        if (enemyBody) {
          setTimeout(function () {
            enemyAttack.buidAttack('enemy');
          }, 2000);
          setTimeout(function () {
            skills.buildSkills();
            skills.addEventsOnSkills();
          }, 4000);
        }
      }
      game.removeChild(task);
    }
  }
}
