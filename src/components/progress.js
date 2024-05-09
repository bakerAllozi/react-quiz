import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPossibePoints, answer } = useQuiz();

  return (
    <header>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question<strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossibePoints}
      </p>
    </header>
  );
}

export default Progress;
