import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { points, hightScore, dispatch, maxPossibePoints } = useQuiz();
  const percentage = (points / maxPossibePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <div style={{ padding: "100px" }}>
      <p className="result" style={{ padding: "20px" }}>
        you scored <span>{emoji}</span> <strong>{points}</strong> out of
        {maxPossibePoints}({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Highscore {hightScore} points</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "rest" })}>
        rest
      </button>
    </div>
  );
}

export default FinishScreen;
