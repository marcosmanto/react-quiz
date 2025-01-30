import { createContext, useContext, useEffect, useReducer } from 'react'
import { Actions, Status, SECS_PER_QUESTION } from '../components/constants'

const QuizContext = createContext()

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
    default:
      throw new Error('Action unknown')
  }
}

export function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) throw new Error('QuizContext was used outside of the QuizProvider')
  return context
}
