//1+Number(answer !== null)

import Header from "./Header";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Main from "./Main";
import Question from "./Question.js";
import NextButton from "./nextButton.js";
// import BackButton from "./backButton.js";
import Progress from "./progress.js";
import FinishScreen from "./finishScreen.js";
import Timer from "./Timer.js";
import { useQuiz } from "../context/QuizContext.js";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer>
              <Timer />
              <NextButton />
              hh
            </footer>
            {/* <BackButton /> */}
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
