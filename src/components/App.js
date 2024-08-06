import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import Question from './Question'
import NextButton from './NextButton'
import { useEffect, useReducer } from 'react'
import StartScreen from './StartScreen'
import Progress from './Progress'
import Footer from './Footer'
import FinishedScreen from './FinishedScreen'
import Timer from './Timer'

const Status = Object.freeze({
  LOADING: Symbol('loading'),
  ERROR: Symbol('error'),
  READY: Symbol('ready'),
  ACTIVE: Symbol('active'),
  FINISHED: Symbol('finished')
})

const Actions = Object.freeze({
  DATA_RECEIVED: Symbol('datareceived'),
  DATA_FAILED: Symbol('datafailed'),
  START: Symbol('start'),
  NEW_ANSWER: Symbol('newanswer'),
  NEXT_QUESTION: Symbol('nextquestion'),
  FINISH: Symbol('finish'),
  RESTART: Symbol('restart')
})

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

function reducer(state, action) {
  switch (action.type) {
    case Actions.DATA_RECEIVED:
      return {
        ...state,
        questions: action.payload,
        status: Status.READY
      }
    case Actions.DATA_FAILED:
      return {
        ...state,
        status: Status.ERROR
      }
    case Actions.START:
      return { ...state, status: Status.ACTIVE, secondsRemaining: state.questions.length * SECS_PER_QUESTION }
    case Actions.NEW_ANSWER:
      const question = state.questions.at(state.index)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case Actions.NEXT_QUESTION:
      return {
        ...state,
        index: state.index++,
        answer: null
      }
    case Actions.FINISH:
      return { ...state, status: Status.FINISHED, highscore: state.points > state.highscore ? state.points : state.highscore }
    case Actions.RESTART:
      return { ...initialState, questions: state.questions, highscore: state.highscore, status: Status.READY }
    case 'tick':
      return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? Status.FINISHED : state.status }
    case Actions.default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPoints = questions.reduce((accumulator, currentQuestion) => accumulator + currentQuestion.points, 0)

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: Actions.DATA_RECEIVED, payload: data }))
      .catch(err => dispatch({ type: Actions.DATA_FAILED }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <Error />}
        {status === Status.READY && <StartScreen numQuestions={numQuestions} dispatch={dispatch} actions={Actions} />}
        {status === Status.ACTIVE && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions.at(index)} dispatch={dispatch} answer={answer} actions={Actions} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton index={index} numQuestions={numQuestions} dispatch={dispatch} answer={answer} actions={Actions} />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && <FinishedScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} actions={Actions} />}
      </Main>
    </div>
  )
}
