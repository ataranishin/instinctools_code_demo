import Attack from './../attack';
import Congratulation from './../congrats';
import Explosion from './../explosion';
import Skills from './../skills';
export default class DragNDropTask {
  constructor() {
    this.word = vocabulary[Math.floor(Math.random()*(vocabulary.length))].word;
  }
  buildTask() {
    let task = document.createElement('div');
    task.id = 'task';
    task.classList.add('global_wrap');
    task.classList.add('grid');
    game.appendChild(task);

    let title = document.createElement('h1');
    title.innerHTML = 'Restore the mixed word';
    task.appendChild(title);

    let shuffledWord = '';
    function shuffle(wordToShuffle) {
        let currentLetter = wordToShuffle.length - 1;
        let randomLetter;
        while (currentLetter >= 0) {
            randomLetter = Math.floor(Math.random() * currentLetter);
            shuffledWord += wordToShuffle[randomLetter];
            wordToShuffle = wordToShuffle.slice(0, randomLetter) + wordToShuffle.slice(randomLetter + 1);
            currentLetter--;
        }
    };

    shuffle(this.word);
    while (shuffledWord === this.word) {
      shuffledWord = '';
      shuffle(this.word);
    }

    let listOfMixedLetters = document.createElement('ul');
    listOfMixedLetters.setAttribute('id', 'listOfMixedLetters');
    listOfMixedLetters.classList.add('listOfMixedLetters');
    task.appendChild(listOfMixedLetters);


    let shuffledWordLength = shuffledWord.length;
    for (let i = 0; i < shuffledWordLength; i++) {
      let liWithLetter = document.createElement('li');
      liWithLetter.innerHTML = shuffledWord[i];
      listOfMixedLetters.appendChild(liWithLetter);
    }

    $(function() {
        $( "#listOfMixedLetters" ).sortable();
        $( "#listOfMixedLetters" ).disableSelection();
      });

    let button = document.createElement('button');
    button.setAttribute('value', 'submit');
    button.innerHTML = 'answer';
    button.classList.add('submit_task');
    button.classList.add('drag_n_drop_button');
    task.appendChild(button);

    let word = this.word;
    button.onclick = function () {
      event.preventDefault();
      let arr = Array.from(document.getElementsByTagName('li'));
      let str = '';
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].innerHTML;
      }

      let enemyAttack = new Attack();
      let skills = new Skills();
      if (word === str) {
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
