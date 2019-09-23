export default class Rating {
  constructor() {
  }

  createPopupWindow() {
    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.setAttribute('id', 'popup');
    game.appendChild(popup);

    let cross = document.createElement('span');
    cross.classList.add('cross');
    cross.innerHTML = '×';
    popup.appendChild(cross);

    cross.onclick = function () {
    game.removeChild(popup);
    }
  }

  createRatingTable() {
    let rating = document.createElement('h2');
    rating.innerHTML = 'Rating list:';
    popup.appendChild(rating);

    let ratingList = document.createElement('ol');
    popup.appendChild(ratingList);

    let arrayOfUsers = JSON.parse(localStorage.getItem('arrayOfUsers'));
    arrayOfUsers = arrayOfUsers.sort(function compareScore(userA, userB) {
      return userB.killedEnemies - userA.killedEnemies;
    });
    for (let i = 0; i < arrayOfUsers.length; i++) {
      let item = document.createElement('li');
      ratingList.appendChild(item);
      item.appendChild(document.createTextNode(`Name: ${arrayOfUsers[i].name}, killed enemies: ${arrayOfUsers[i].killedEnemies}`));
    }
  }
}
