import { useQuiz } from "../context/QuizContext.js";
import Options from "./Options.js";

function Question() {
  const { question } = useQuiz();

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
