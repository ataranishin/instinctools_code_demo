import Attack from './../attack';
import Congratulation from './../congrats';
import Explosion from './../explosion';
import Skills from './../skills';
export default class AnimalTask {
  constructor() {}
  createAnimalTask() {
    let globalWrap = document.createElement('div');
    globalWrap.className = 'flex global_wrap';
    globalWrap.id = 'task';
    game.appendChild(globalWrap);
    let blockImg = document.createElement('div');
    blockImg.className  = 'flex task_wrap';
    let img = document.createElement('img');
    let taskName = document.createElement('h1');
    taskName.className = 'task';
    img.className = 'flex animal_task';
    globalWrap.appendChild(blockImg);
    blockImg.appendChild(taskName);
    taskName.innerHTML="Who is it?";
    let inpVal = document.createElement('input');
    inpVal.setAttribute('id','animal_name');
    inpVal.className = 'insert_word';
    inpVal.setAttribute('type','text');
    blockImg.appendChild(img);
    blockImg.appendChild(inpVal);
    let buttonAnimal = document.createElement('button');
    buttonAnimal.innerHTML = 'Answer';
    buttonAnimal.className = 'submit_task';
    buttonAnimal.setAttribute('id','animal_submit');
    buttonAnimal.setAttribute('value','submit')
    blockImg.appendChild(buttonAnimal);

    let arrImg = ['elephant','leopard','lion','rabbit','zebra', 'bat', 'bear', 'beaver', 'cat', 'chicken', 'cow', 'crab', 'dog', 'goose', 'horse', 'kangaroo', 'koala', 'monkey', 'squirrel', 'tiger', 'wolf'];
    let rand = arrImg[Math.floor(Math.random() * arrImg.length)];
    img.setAttribute('src',`img/${rand}.png`);

    animal_submit.onclick = function(event) {
      event.preventDefault();
      let value = document.getElementById('animal_name').value;

      let enemyAttack = new Attack();
      let skills = new Skills();
      if(value === rand) {
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
