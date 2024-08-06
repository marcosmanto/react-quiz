function FinishedScreen({ points, maxPoints, highscore, dispatch, actions: Actions }) {
  const percentage = (points / maxPoints) * 100

  let emoji
  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🎉'
  if (percentage >= 50 && percentage < 80) emoji = '😊'
  if (percentage >= 0 && percentage < 50) emoji = '🤔'
  if (percentage === 0) emoji = '🤦‍♂️'

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        <span className="score-message">
          You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
        </span>
      </p>
      {highscore > 0 && <p className="highscore">(Highscore: {highscore} points)</p>}
      <button className="btn btn-ui" onClick={() => dispatch({ type: Actions.RESTART })}>
        Restart quiz
      </button>
    </>
  )
}

export default FinishedScreen
