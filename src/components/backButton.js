import { useQuiz } from "../context/QuizContext";

function BackButton() {
  const { index, dispatch } = useQuiz();
  if (index === 0) return;

  return (
    <button
      style={{ marginRight: "100px" }}
      className="btn btn-ui"
      onClick={() => dispatch({ type: "backQuestion" })}
    >
      Back
    </button>
  );
}

export default BackButton;
