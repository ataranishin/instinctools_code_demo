export default class Enemy {
  constructor() {
    this.adjectives  = ['Imbecile', 'Vile', 'Fastidious', 'Deadly', 'Sullen', 'Vicious', 'Awful', 'Snotty', 'Smelly', 'Foul', 'Dangerous', 'Terrible', 'Sniffling'];
    this.nouns  = ['org', 'troll', 'hooligan', 'bully', 'dwarf', 'goblin', 'bugbear', 'freak', 'monster', 'sultry', 'ghoul'];
    this.names  = ['Yrec', 'Il\'ich', 'Sanek', 'Dimas', 'Leha', 'Vlados', 'Antoha', 'Pashtet', 'Kolyan'];
    this.name = `${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]} ${this.nouns[Math.floor(Math.random()*this.nouns.length)]} ${this.names[Math.floor(Math.random()*this.names.length)]}`;
    this.head = Math.ceil(Math.random()*4);
    this.body = Math.ceil(Math.random()*4);
    this.weapon = Math.ceil(Math.random()*3);
  }

  buildEnemy() {
    let enemyName = document.createElement('p');
    enemyName.innerHTML = this.name;
    enemyName.classList.add('characters_name');
    enemyName.classList.add('enemy_name');
    game.appendChild(enemyName);

    let lifeOfEnemy = document.createElement('div');
    lifeOfEnemy.id = 'lifeOfEnemy';
    lifeOfEnemy.classList.add('quantity_of_lost_life');
    lifeOfEnemy.classList.add('quantity_of_lost_life_of_enemy');
    lifeOfEnemy.innerHTML = '100/100';
    game.appendChild(lifeOfEnemy);

    let enemyHead = document.createElement('div');
    enemyHead.classList.add('enemy_head');
    enemyHead.classList.add(`enemy_body_${this.head}`);
    enemyHead.setAttribute('id', 'enemyHead');
    game.appendChild(enemyHead);

    let enemyBody = document.createElement('div');
    enemyBody.classList.add('enemy_body');
    enemyBody.classList.add(`enemy_body_${this.body}`);
    enemyBody.setAttribute('id', 'enemyBody');
    game.appendChild(enemyBody);

    let enemyLegs = document.createElement('div');
    enemyLegs.classList.add('enemy_legs');
    enemyLegs.classList.add(`enemy_body_${this.body}`);
    enemyLegs.setAttribute('id', 'enemyLegs');
    game.appendChild(enemyLegs);

    let enemyWeapon = document.createElement('div');
    enemyWeapon.classList.add('enemy_weapon');
    enemyWeapon.classList.add(`enemy_weapon_${this.weapon}`);
    enemyWeapon.setAttribute('id', 'enemyWeapon');
    game.appendChild(enemyWeapon);
    function animateEnemy() {
      if (enemyHead.style.bottom === '325px') {
        enemyHead.style.bottom = '320px';
        enemyWeapon.style.bottom = '125px';
      } else {
        enemyHead.style.bottom = '325px';
        enemyWeapon.style.bottom = '130px';
      }
    }
    setInterval(animateEnemy, 500);
  }
}
