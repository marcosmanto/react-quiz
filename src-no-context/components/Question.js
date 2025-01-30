import Options from './Options'

function Question({ question, dispatch, answer, actions }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} actions={actions} />
    </div>
  )
}

export default Question
