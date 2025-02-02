import { useEffect, useState } from "react";

const TypingText = ({ textArr, dispatch, setIsTyping }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    if (lineIndex < textArr.length) {
      let i = 0;
      const interval = setInterval(() => {
        setIsTyping(true);
        setCurrentLine(textArr[lineIndex].substring(0, i + 1));
        i++;
        if (i === textArr[lineIndex].length) {
          clearInterval(interval);
          dispatch({ type: "TYPED", payload: textArr[lineIndex] });
          setCurrentLine("");
          setTimeout(() => {
            setLineIndex((prevIndex) => prevIndex + 1);
          }, 500);
        }
      }, 20);
      return () => clearInterval(interval);
    } else if (lineIndex === textArr.length) {
      setIsTyping(false);
    }
  }, [dispatch, lineIndex, textArr, setIsTyping]);

  return <span>{currentLine}</span>;
};
export default TypingText;
