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
  "Riddle#3 - What is broken, once you have said it?",
];

// const riddles = riddles1.slice(0, 1);

const answers = ["Secret", "Tomorrow", "Silence"];

const correctAnsTexts = [
  "The truth does not evade you. Try another and see what you uncover.",
  "Your intelligence knows no bounds. But here’s one you may not know.",
  "YOU MAY HAVE GOTTEN THIS ONE, BUT ONLY I HAVE ALL THE ANSWERS. HERE'S ANOTHER.",
  "YOU'RE QUITE THE THINKER. NOW, THINK ABOUT THIS NEXT ONE.",
  "A CORRECT ANSWER LEADS YOU CLOSER TO FULFILLMENT. NOW, HERE'S ANOTHER RIDDLE.",
  "YOU'RE GOOD. ON TO THE NEXT ONE.",
  "PRECISELY. NOW LET'S SEE IF YOU HAVE WHAT IT TAKES TO CORRECTLY ANSWER ANOTHER.",
];

const wrongAnsTexts = [
  "You got it wrong. Why you try again...",
  "Not quite - better luck then.",
  "They can't be all winners. Give it some thoughts and try again.",
  "That was a wild guess. If you want to win, you must try a little harder.",
  "WHEN YOU GUESS WRONG, I GUESS YOU'D BETTER TRY AGAIN.",
  "POWER HAS CORRRUPTED YOU, AND YOUR ANSWERS. THINK A LITTLE HARDER.",
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
