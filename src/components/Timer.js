import { useEffect } from 'react'

function Timer({ dispatch, secondsRemaining }) {
  const mins = String(Math.floor(secondsRemaining / 60))
  const seconds = String(secondsRemaining % 60)

  useEffect(function () {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => clearInterval(id)
  }, [])
  return (
    <div className="timer">
      {mins.padStart(2, '0')}:{seconds.padStart(2, '0')}
    </div>
  )
}

export default Timer
