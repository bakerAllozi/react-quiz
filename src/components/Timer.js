import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemainig } = useQuiz();

  const mins = Math.floor(secondsRemainig / 60);
  const seconds = secondsRemainig % 60; //تحويل الثواني الى نضام الساعة
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
