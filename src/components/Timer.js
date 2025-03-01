import { useEffect } from 'react'
import { useQuiz } from '../providers/QuizProvider'

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz()

  const mins = String(Math.floor(secondsRemaining / 60))
  const seconds = String(secondsRemaining % 60)

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: 'tick' })
      }, 1000)

      return () => clearInterval(id)
    },
    [dispatch]
  )
  return (
    <div className="timer">
      {mins.padStart(2, '0')}:{seconds.padStart(2, '0')}
    </div>
  )
}

export default Timer
