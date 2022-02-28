import { useState, useEffect } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          alert("Finished!");
          clearInterval(interval);
          return prev;
        }

        return prev - 1;
      });
    }, 1000);
  }, []);

  return <div>{timer}</div>;
};

export default Timer;
