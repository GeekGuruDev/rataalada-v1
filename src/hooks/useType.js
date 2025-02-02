import { useState } from "react";
import { useEffect } from "react";

function useType(
  arr,
  setTextHistory,
  setCurrentLine,
  condition = true,
  rand = false
) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const textArray = rand
      ? [arr[Math.floor(Math.random() * arr.length)]]
      : arr;

    console.log("Effect", condition, lineIndex, textArray.length);

    if (condition && lineIndex < textArray.length) {
      console.log(lineIndex, textArray);
      let i = 0;
      const interval = setInterval(() => {
        if (i < textArray[lineIndex].length) {
          setCurrentLine(textArray[lineIndex].substring(0, i + 1));
          console.log(textArray[lineIndex].substring(0, i + 1));
          console.log("LI", lineIndex, "i=", i, textArray[lineIndex].length);

          i++;
        } else {
          console.log("truuuuuuuuuuuuuuuuuuuuuuuuuuuu", interval);

          clearInterval(interval);
          setTextHistory((prev) => [...prev, textArray[lineIndex]]);
          setCurrentLine("");
          setTimeout(() => {
            setLineIndex((pre) => pre + 1);
          }, 10);
        }
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [setTextHistory, setCurrentLine, lineIndex, condition, rand, arr]);
}
export default useType;
