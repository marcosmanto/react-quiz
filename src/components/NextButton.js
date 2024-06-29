function NextButton({ dispatch, answer, actions: Actions }) {
  if (answer === null) return null

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: Actions.NEXT_QUESTION })}>
      Next
    </button>
  )
}

export default NextButton
