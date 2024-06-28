import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
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
  DATA_FAILED: Symbol('datafailed')
})

const initialState = {
  questions: [],
  status: Status.LOADING
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
    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

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
        {status === Status.READY && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  )
}
