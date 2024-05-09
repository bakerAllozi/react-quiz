import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  hightScore: 0,
  QF: [],
  secondsRemainig: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemainig: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const isPons = state.QF.includes(question.question);
      return {
        ...state,
        answer: action.payload,
        points:
          !isPons && action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        QF: [...state.QF, question.question],
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "backQuestion":
      return {
        ...state,
        index: state.index - 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        hightScore:
          state.points > state.hightScore ? state.points : state.hightScore,
      };
    case "rest":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        hightScore: 0,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemainig: state.secondsRemainig - 1,
        status: state.secondsRemainig === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      hightScore,
      idForeQ,
      secondsRemainig,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossibePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        hightScore,
        idForeQ,
        secondsRemainig,
        dispatch,
        numQuestions,
        maxPossibePoints,
        question: questions[index],
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
