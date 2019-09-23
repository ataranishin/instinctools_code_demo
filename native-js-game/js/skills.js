import DragNDropTask from './tasks/drap_n_drop_task';
import MathTask from './tasks/math';
import AnimalTask from './tasks/animals';
import ListeningTask from './tasks/listening';
import TranslateTask from './tasks/translate';
import MatchingWords from './tasks/matching_words';
import TranslateNumber from './tasks/translate_number';
export default class Skills {
  constructor() {}

  buildSkills() {
    let appendToMain = document.getElementById('game');
    let flexWrap = document.createElement('div');
    flexWrap.id = 'choiceOfSkills';
    flexWrap.className = 'flex flex_container';
    let wrapperSkills = document.createElement('div');
    flexWrap.appendChild(wrapperSkills);
    wrapperSkills.setAttribute('id','skill_board');
    wrapperSkills.className = 'flex wrap_skills';
    appendToMain.appendChild(flexWrap);
    flexWrap.appendChild(wrapperSkills);
    for(let i = 1;i<=7;i++) {
      let div = document.createElement('div');
      div.id = `skill_${i}`;
      div.className = `skill skill_${i}`;
      wrapperSkills.appendChild(div);
    }
  }

  addEventsOnSkills() {
    skill_board.onclick = function (event) {
      if (event.target.id === 'skill_1') {
        let task = new DragNDropTask();
        task.buildTask();
        game.removeChild(choiceOfSkills);
      }
      if (event.target.id === 'skill_2') {
        let task = new MathTask();
        task.buildMathTask();
        game.removeChild(choiceOfSkills);
      }
      if (event.target.id === 'skill_3') {
        let task = new AnimalTask();
        task.createAnimalTask();
        game.removeChild(choiceOfSkills);
      }
      if (event.target.id === 'skill_4') {
        let task = new ListeningTask();
        task.createListening();
        game.removeChild(choiceOfSkills);
      }
      if (event.target.id === 'skill_5') {
        let task = new TranslateTask();
        task.createTranslation();
        game.removeChild(choiceOfSkills);
      }
      if (event.target.id === 'skill_6') {
        let task = new MatchingWords();
        task.buildTask();
        game.removeChild(choiceOfSkills);
      }
      if (event.target.id === 'skill_7') {
        let task = new TranslateNumber();
        task.buildTranslateNumber();
        game.removeChild(choiceOfSkills);
      }
    }
  }
}
