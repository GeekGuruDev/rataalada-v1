import { useEffect, useReducer, useRef, useState } from "react";
import TypingText from "./TypingText";
import {
  initPrompts,
  accepted,
  decline,
  riddles,
  answers,
  correctAnsTexts,
  wrongAnsTexts,
  endTexts,
} from "../prompts";

const initialState = {
  textHistory: [],
  currentTexts: initPrompts,
  inputVal: "",
  riddleIdx: 0,
  isAnswering: false,
  status: "init",
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
            currentTexts: [...accepted, riddles[0]],
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
        action.payload.trim().toUpperCase() ===
        answers[state.riddleIdx].toUpperCase()
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
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [textHistory]);

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (status !== "play" && textHistory.at(-1) === riddles.at(0))
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
    <div className="terminal p-[1rem] md:p-[2rem] pb-[50vh] md:pb-[10vh] xl:pr-[20vw]">
      {textHistory.map((text, index) => (
        <div className="flex" key={index}>
          <span>&gt;&gt;&nbsp;</span>
          {text.toUpperCase() === endTexts[2].toUpperCase() ? (
            <a href="https://discord.gg/vzQMa7ZCwq">{text}</a>
          ) : text.toUpperCase() === endTexts[4].toUpperCase() ? (
            <span>
              You know where to find me:{" "}
              <a href="https://discord.com/users/1253314203121483782">
                [ CLICK TO REACH ME ]
              </a>
              .
            </span>
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
        <form onSubmit={handleAnswer}>
          <input
            type="text"
            value={inputVal}
            placeholder={isTyping ? "" : "Tap here to type"}
            ref={inputRef}
            disabled={isTyping}
            className="outline-none caret-transparent text-transparent lg:opacity-0 placeholder:opacity-50"
            onBlur={handleBlur}
            onChange={(e) => {
              dispatch({ type: "INPUT", payload: e.target.value });
            }}
          />
        </form>
      )}
      {isEnded && <input type="text" className="opacity-0" disabled />}
      <div ref={endRef} />
    </div>
  );
}
export default Terminal;
