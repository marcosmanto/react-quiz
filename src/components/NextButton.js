import { useQuiz } from '../providers/QuizProvider'
import { Actions } from './constants'

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz()

  if (answer === null) return null

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: Actions.NEXT_QUESTION })}>
        Next
      </button>
    )
  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: Actions.FINISH })}>
        Finish
      </button>
    )
}

export default NextButton
