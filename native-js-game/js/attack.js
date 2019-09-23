import Explosion from './explosion';
export default class Attack {
  constructor() {
  }

  buidAttack(character) {
    let fireAttackWrapper = document.createElement('div');
    fireAttackWrapper.id = 'fireAttackWrapper';
    fireAttackWrapper.classList.add('fire_attack_wrapper');
    game.appendChild(fireAttackWrapper);
    let frames = 1;
    let positionY;
    let fireAttackWrapperPosition;

    if (character === 'player') {
      positionY = 0;
      fireAttackWrapperPosition = 0;
    }
    if (character === 'enemy') {
      positionY = -270;
      fireAttackWrapperPosition = window.innerWidth - 500;
    }
    function animateFire() {
      if (frames === 1) {
        fireAttackWrapper.setAttribute('style', `background-position: ${-55 - frames * 280}px ${positionY}px;`);
      } else {
        fireAttackWrapper.setAttribute('style', `background-position: ${-55*frames - frames * 280}px ${positionY}px;`);
      }
      frames++;
      if (frames > 5) {
        frames = 1;
      }
    }

    setInterval(animateFire, 100);

    let sound = new Audio();
    function playSound(url){
    sound.pause();
    sound.currentTime = 2;
    sound.src = url;
    sound.play();
    }
    playSound('audio/Sound_20640.mp3');

    let moveFireInterval = setInterval(moveFire, 100);
    function moveFire() {
      if (character === 'player') {
        if (fireAttackWrapperPosition > window.innerWidth - 500) {
          clearInterval(moveFireInterval);
          game.removeChild(fireAttackWrapper);
        } else {
          fireAttackWrapperPosition += 95;
          fireAttackWrapper.style.left = `${fireAttackWrapperPosition}px`;
        }
      }

      if (character === 'enemy') {
        if (!!enemyBody) {
          if (fireAttackWrapperPosition < 50) {
            clearInterval(moveFireInterval);
            game.removeChild(fireAttackWrapper);

            let lostLifeArr = lifeOfPlayer.innerHTML.split(/\//g);
            lifeOfPlayer.innerHTML = `${lostLifeArr[0] - 10}/100`;
            lifeOfPlayer.setAttribute('style', `background-position: -${(100 - (lostLifeArr[0] - 10)) * 3.5}px -11px;`);

            if (lostLifeArr[0] - 10 === 0) {
              let explosion = new Explosion('player');
              explosion.buidExplosion();
            }
          } else {
            fireAttackWrapperPosition -= 95;
            fireAttackWrapper.style.left = `${fireAttackWrapperPosition}px`;
          }
        }
      }
    }
  }
}
