import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import Question from './Question'
import NextButton from './NextButton'
import { useEffect, useReducer } from 'react'
import StartScreen from './StartScreen'

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
  NEXT_QUESTION: Symbol('nextquestion')
})

const initialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answer: null,
  points: 0
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
      return { ...state, status: Status.ACTIVE }
    case Actions.NEW_ANSWER:
      const question = state.questions.at(state.index)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case Actions.NEXT_QUESTION:
      return {
        ...state,
        index: state.index++,
        answer: null
      }
    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

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
            <Question question={questions.at(index)} dispatch={dispatch} answer={answer} actions={Actions} />
            <NextButton dispatch={dispatch} answer={answer} actions={Actions} />
          </>
        )}
      </Main>
    </div>
  )
}
