import Enemy from './enemy';
import Skills from './skills';
import GameOver from './gameover';
export default class Game {
  constructor() {}
  startGame() {
    game.setAttribute('style', `background: url(img/backgrounds/background_${Math.ceil(Math.random()*7)}.png) repeat bottom / cover;`);

    let finishGame = document.createElement('button');
    finishGame.setAttribute('id', 'finishGame');
    finishGame.classList.add('finish_game_button');
    finishGame.innerHTML = 'Finish game';
    game.appendChild(finishGame);

    finishGame.onclick = function () {
      let gameover = new GameOver();
      gameover.init();
    }

    let enemy = new Enemy();
    enemy.buildEnemy();

    let skills = new Skills();
    skills.buildSkills();
    skills.addEventsOnSkills();
  }
}
