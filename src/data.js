const initPrompts = [
  "I’ve been trying to reach you. Glad you finally found me. Should we play a game?",
  "Proceed? [Y/N]",
];

const accepted = [
  "It’s more than just a game.",
  "Three correct answers and the truth will be exposed. Let’s get started.",
];

const decline = ["Farewell. We’ll try to play another time."];

const riddles = [
  "Riddle#1 - The more I’m revealed the less I exist",
  "Riddle#2 - I am always coming, but never arrive. What am I?",
  "Riddle#3 - Those who make me are likely to break me.",
];

// const riddles = riddles1.slice(0, 1);

const answers = ["Secret", "Tomorrow", "Law"];

const correctAnsTexts = [
  "The truth does not evade you. Try another and see what you uncover.",
  "Your intelligence knows no bounds. But here’s one you may not know.",
];

const wrongAnsTexts = [
  "You got it wrong. Why you try again...",
  "Not quite - better luck then.",
  "They can't be all winners. Give it some thoughts and try again.",
  "That was a wild guess. If you want to win, you must try a little harder.",
];

const endTexts = [
  "Three out of three. You’re one of the smarter ones.",
  "Let’s see what your hard work has revealed.",
  "[ CLICK FOR REWARD ]",
  "The game may be over for now, but I’m just getting started. See you next time.",
];

export {
  initPrompts,
  accepted,
  decline,
  riddles,
  answers,
  correctAnsTexts,
  wrongAnsTexts,
  endTexts,
};
