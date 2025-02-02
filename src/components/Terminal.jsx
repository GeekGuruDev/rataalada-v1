import { useEffect, useReducer, useRef, useState } from "react";
import TypingText from "./TypingText";

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

const initialState = {
  textHistory: [],
  currentTexts: initPrompts,
  inputVal: "",
  riddleIdx: 0,
  isAnswering: false,
  status: "init",
  isFocous: false,
  isTyping: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "INPUT": {
      const newValue = action.payload.toUpperCase();
      if (state.status === "init") {
        if (newValue === "Y")
          return {
            ...state,
            textHistory: [...state.textHistory, "Y"],
            currentTexts: accepted,
            status: "play",
          };
        if (newValue === "N")
          return {
            ...state,
            textHistory: [...state.textHistory, "N"],
            currentTexts: decline,
          };
        else return { ...state, inputVal: "" };
      } else if (state.status === "play")
        return {
          ...state,
          inputVal: newValue,
          isAnswering: true,
        };
      else return { ...state };
    }
    case "ANSWRED":
      if (
        action.payload.toUpperCase() === answers[state.riddleIdx].toUpperCase()
      ) {
        if (state.riddleIdx === riddles.length - 1) {
          return {
            ...state,
            isAnswering: false,
            textHistory: [...state.textHistory, action.payload],
            inputVal: "",
            currentTexts: endTexts,
          };
        }

        const nextRiddleIdx = state.riddleIdx + 1;
        return {
          ...state,
          isAnswering: false,
          riddleIdx: nextRiddleIdx,
          textHistory: [...state.textHistory, action.payload],
          inputVal: "",
          currentTexts: [
            correctAnsTexts[Math.floor(Math.random() * correctAnsTexts.length)],
            riddles[nextRiddleIdx],
          ],
        };
      } else {
        return {
          ...state,
          isAnswering: false,
          textHistory: [...state.textHistory, action.payload],
          currentTexts: [
            wrongAnsTexts[Math.floor(Math.random() * wrongAnsTexts.length)],
          ],
          inputVal: "",
        };
      }

    case "TYPING":
      return { ...state, isTyping: true };

    case "TYPED":
      return {
        ...state,
        isTyping: false,
        textHistory: [...state.textHistory, action.payload],
      };

    case "PLAY":
      return {
        ...state,
        currentTexts: [riddles[0]],
      };
    default:
      return state;
  }
}

function Terminal() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { textHistory, inputVal, isAnswering, currentTexts, status } = state;
  const [isTyping, setIsTyping] = useState(true);

  const inputRef = useRef(null);

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (status === "play" && textHistory.at(-1) === accepted.at(-1))
      dispatch({ type: "PLAY" });
  }, [status, textHistory]);

  useEffect(() => {
    if (inputRef.current || !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  function handleAnswer(e) {
    e.preventDefault();
    dispatch({ type: "ANSWRED", payload: inputVal });
  }

  const isEnded =
    textHistory.at(-1)?.toUpperCase() === decline.at(-1)?.toUpperCase() ||
    textHistory.at(-1)?.toUpperCase() === endTexts.at(-1)?.toUpperCase();

  return (
    <div className="terminal p-[2rem] md:p-[3rem]">
      {textHistory.map((text, index) => (
        <div className="flex" key={index}>
          <span>&gt;&gt;&nbsp;</span>
          {text.toUpperCase() === endTexts[2].toUpperCase() ? (
            <a href="https://discord.gg/vzQMa7ZCwq">{text}</a>
          ) : (
            <span>{text}</span>
          )}
        </div>
      ))}

      {!isEnded && (
        <div className="flex">
          <span>&gt;&gt;&nbsp;</span>
          <span>
            {isAnswering ? (
              inputVal
            ) : (
              <TypingText
                key={currentTexts}
                dispatch={dispatch}
                textArr={currentTexts}
                setIsTyping={setIsTyping}
              />
            )}
            <span className="cursor">&lt;?&gt;</span>
          </span>
        </div>
      )}

      {!isEnded && (
        <form className="opacity-0" onSubmit={handleAnswer}>
          <input
            type="text"
            value={inputVal}
            ref={inputRef}
            disabled={isTyping}
            onBlur={handleBlur}
            onChange={(e) => {
              dispatch({ type: "INPUT", payload: e.target.value });
            }}
          />
        </form>
      )}
    </div>
  );
}
export default Terminal;
