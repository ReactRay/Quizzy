import { useEffect } from "react"
import { Header } from "./components/Header.jsx"
import { useReducer } from "react"
import Main from "./components/Main.jsx"
import { Loader } from "./components/Loader.jsx"
import { Error } from "./components/Error.jsx"
import { StartScreen } from "./components/StartScreen.jsx"
import { Question } from "./components/Question.jsx"
import { NextButton } from "./components/NextButton.jsx"
import { Progress } from "./components/Progress.jsx"
import FinishedScreen from "./components/FinishedScreen.jsx"





const getInitialState = {
  questions: [],
  //loading,error,ready,active,finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payLoad, status: 'ready' }

    case 'dataFailed':
      return { ...state, status: 'error' }

    case 'start':
      return { ...state, status: 'active' }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payLoad,
        points: action.payLoad === question.correctOption
          ? state.points + question.points
          : state.points
      }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    case 'finish':
      return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }

    case 'restart':
      return { ...getInitialState, status: 'ready', questions: state.questions }

    default:
      throw new Error('action unkown')
  }

}




function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, getInitialState)



  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)
  useEffect(() => {
    fetchQuestions()
  }, [])


  async function fetchQuestions() {
    try {
      const res = await fetch('http://localhost:3030/api/questions')
      const data = await res.json()
      dispatch({ type: 'dataReceived', payLoad: data[0].questions })
      console.log(data[0].questions)
    } catch (error) {
      dispatch({ type: 'dataFailed' })
    }

  }

  return (
    <div className="app">

      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === 'active' && <>
          <Progress answer={answer} index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} />
          <Question answer={answer} dispatch={dispatch} question={questions[index]} />
          <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
        </>}

        {status === 'finished' && <FinishedScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />}

      </Main>

    </div>
  )
}

export default App
