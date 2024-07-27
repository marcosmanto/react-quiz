function NextButton({ dispatch, answer, index, numQuestions, actions: Actions }) {
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
