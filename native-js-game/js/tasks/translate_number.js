import Attack from './../attack';
import Congratulation from './../congrats';
import Explosion from './../explosion';
import Skills from './../skills';
export default class TranslateNumber {
  constructor(){}
  buildTranslateNumber() {
    let mainAppend = document.getElementById('game');
    let translateNumber = document.createElement('div');
    translateNumber.className = 'flex global_wrap';
    translateNumber.id = 'task';
    mainAppend.appendChild(translateNumber);
    let translateNumberWrap = document.createElement('div');
    translateNumber.appendChild(translateNumberWrap);
    translateNumberWrap.className = 'flex task_wrap';

    let taskName = document.createElement('h1');
    taskName.className = 'task';
    taskName.innerHTML = 'Translate the number:';
    translateNumberWrap.appendChild(taskName);
    let translateNumberForm = document.createElement('form');
    translateNumberForm.className = 'flex task_form';
    translateNumberWrap.appendChild(translateNumberForm);
    let number = document.createElement('label');
    number .className = 'task_random';
    number.setAttribute('id','get_number');
    translateNumberForm.appendChild(number);
    let numberTrans = document.createElement('input');
    numberTrans.setAttribute('id','translate_number');
    numberTrans.setAttribute('type','text');
    numberTrans.setAttribute('autocomplete','off');
    numberTrans.className = 'insert_word';
    translateNumberForm.appendChild(numberTrans);
    let transSubmit = document.createElement('button');
    transSubmit.className = 'submit_task';
    transSubmit.setAttribute('id','check_translate');
    transSubmit.innerHTML = 'Answer';
    translateNumberForm.appendChild(transSubmit);
    let cashIndex = Math.floor(Math.random()*numbers.length);
    let numberInput = numbers[cashIndex].onscreen;
    let translate = numbers[cashIndex].translate;
    let label = document.getElementById('get_number');
    label.innerHTML = numberInput;

    let button = document.getElementById('check_translate');
    button.onclick = function(event) {
      event.preventDefault();

      let enemyAttack = new Attack();
      let skills = new Skills();
      let input = document.getElementById('translate_number').value;
      if(translate.indexOf(input)!==-1) {
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
