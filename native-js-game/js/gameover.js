import Rating from './rating';
import Registration from './registration';
export default class GameOver {
  constructor() {
  }
  init() {
    game.innerHTML = '';
    let wrapper = document.createElement('div');
    wrapper.id = 'gameOverWrapper';
    wrapper.classList.add('global_wrap');
    wrapper.classList.add('grid');
    game.appendChild(wrapper);

    let h1 = document.createElement('h1');
    h1.classList.add('gameover_text');
    h1.innerHTML = 'GAME OVER';
    wrapper.appendChild(h1);

    let h2 = document.createElement('h2');
    h2.classList.add('gameover_text');
    let arrayOfUsers = JSON.parse(localStorage.getItem('arrayOfUsers'));
    h2.innerHTML = `Killed enemies: ${arrayOfUsers[arrayOfUsers.length - 1].killedEnemies}`;
    wrapper.appendChild(h2);

    let registationPage = document.createElement('button');
    registationPage.id = 'registation_page';
    registationPage.setAttribute('value', 'submit');
    registationPage.innerHTML = 'Registration page';
    registationPage.classList.add('game_over_button');
    wrapper.appendChild(registationPage);

    let buttonRating = document.createElement('button');
    buttonRating.setAttribute('id', 'buttonRating');
    buttonRating.classList.add('game_over_button');
    buttonRating.innerHTML = 'Watch rating';
    wrapper.appendChild(buttonRating);

    buttonRating.onclick = function (event) {
      event.preventDefault();
      let rating = new Rating;
      rating.createPopupWindow();
      rating.createRatingTable();
    }

    registation_page.onclick = function (event) {
      event.preventDefault();
      game.removeChild(gameOverWrapper);
      let registation = new Registration;
      registation.initialize();
    }
  }
}
