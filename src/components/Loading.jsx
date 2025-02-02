import { useEffect, useState } from "react";
import LoaderImg from "./LoaderImg";

const status = ["Load Ram", "Trace Load", "Tracing...", "Boot Load"];
const time = [300, 200, 500, 200];

function Loading({ setIsLoading }) {
  const [idx, setIdx] = useState(0);
  const showImg = idx === status.length;

  useEffect(() => {
    if (showImg) {
      const interval = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearInterval(interval);
    }

    const interval = setTimeout(() => {
      setIdx((prev) => prev + 1);
    }, time[idx]);

    return () => clearInterval(interval);
  }, [setIsLoading, showImg, idx]);

  if (!showImg) return <div className="text-xl p-4">{status[idx]}</div>;
  else return <LoaderImg />;
}

export default Loading;
