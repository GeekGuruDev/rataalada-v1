import { useState } from "react";
import Loading from "./components/Loading";
import Terminal from "./components/Terminal";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="grainy">
      {isLoading ? <Loading setIsLoading={setIsLoading} /> : <Terminal />}
    </div>
  );
}

export default App;
