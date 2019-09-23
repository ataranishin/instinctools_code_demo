import GameOver from './gameover';
export default class Explosion {
  constructor(character) {
    this.character = character;
  }
  buidExplosion() {
    let explosionWrapper = document.createElement('div');
    explosionWrapper.id = 'explosionWrapper';
    explosionWrapper.classList.add('explosion_wrapper');
    game.appendChild(explosionWrapper);

    let character = this.character;
    if (character === 'player') {
      explosionWrapper.classList.add('explosion_player');
    }
    if (character === 'enemy') {
      explosionWrapper.classList.add('explosion_enemy');
    }

    let frames = 1;

    function animateExplosion() {

      if (character === 'player') {
        explosionWrapper.setAttribute('style', `background-position: -150px ${- frames * 580}px;`);
      }
      if (character === 'enemy') {
        explosionWrapper.setAttribute('style', `background-position: -80px ${- frames * 580}px;`);
      }

      frames++;
      if (frames > 5) {
        frames = 1;
      }
    }
    setInterval(animateExplosion, 200);

    setTimeout(function () {
      game.removeChild(explosionWrapper);
      if (character === 'enemy') {
        game.removeChild(enemyHead);
        game.removeChild(enemyBody);
        game.removeChild(enemyLegs);
        game.removeChild(enemyWeapon);
      }
      if (character === 'player') {
        game.removeChild(playerHead);
        game.removeChild(playerBody);
        game.removeChild(playerLegs);
        setTimeout(function () {
          let gameover = new GameOver();
          gameover.init();
        }, 1000);
      }
    }, 2000);
  }
}
