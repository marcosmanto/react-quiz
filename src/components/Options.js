import { useQuiz } from '../providers/QuizProvider'
import { Actions } from './constants'

function Options({ question }) {
  const { answer, dispatch } = useQuiz()
  const hasAnswered = answer !== null

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''}`} disabled={hasAnswered} key={option} onClick={() => dispatch({ type: Actions.NEW_ANSWER, payload: index })}>
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
