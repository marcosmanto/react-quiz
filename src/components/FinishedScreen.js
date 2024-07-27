function FinishedScreen({ points, maxPoints, highscore }) {
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
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  )
}

export default FinishedScreen
