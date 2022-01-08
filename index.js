const rollHistory = [];
const stepDice = [0, 4, 6, 8, 12, 20];
const steps = 0;
const base = document.querySelector('.base');
const mod = document.querySelector('.modifier');
const roll = document.querySelector('.roll');
const broad = document.querySelector('#broad');
const specialty = document.querySelector('#specialty');

const stepSlider = document.querySelector('#stepScale');
const stepValueDisplay = document.querySelector('.stepValue');
const totalDisplay = document.querySelector('.total');

stepValueDisplay.innerHTML = stepSlider.value;

stepSlider.oninput = function () {
  stepValueDisplay.innerHTML = this.value;
};

roll.addEventListener('click', (e) => {
  // Random dice
  let baseRoll = random(20);
  let modRoll = random(stepDicePicker(stepSlider.value));
  let modTotal = 0;

  // makes mod roll negative if appropriate
  if (stepSlider.value < 0) {
    modRoll = -modRoll;
  } else if (stepSlider.value === 0) {
    modRoll = 0;
  }

  // pushes rolls to history array
  rollHistory.push([baseRoll, modRoll]);
  let lastRoll = rollHistory[rollHistory.length - 1];

  // if slider value = 0
  if (stepSlider.value > 5) {
    let additionalDice = stepSlider.value - 5;
    for (let i = 0; i < additionalDice; i++) {
      lastRoll.push(random(stepDicePicker(20)));
    }
  }
  // let lastRoll = [baseRoll, modRoll]

  console.log(lastRoll);
  for (let i = 1; i < lastRoll.length; i++) {
    modTotal += lastRoll[i];
  }
  base.innerHTML = lastRoll[0];
  mod.innerHTML = modTotal;

  totalDisplay.innerHTML = lastRoll[0] + modTotal;
});

// random number based on the die
function random(die) {
  if (die === 0) {
    return 0;
  }
  return Math.floor(Math.random() * die + 1);
}

// Selects the proper dice to roll for the step modifier
function stepDicePicker(x) {
  let stepValueDiceValues = [0, 4, 6, 8, 12, 20];
  if (x < 0) {
    return stepValueDiceValues[-x];
  } else if (x > 5) {
    return stepValueDiceValues[5];
  } else {
    return stepValueDiceValues[x];
  }
}
