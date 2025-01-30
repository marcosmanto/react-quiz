import { useReducer } from 'react'

const Actions = Object.freeze({
  DEC: Symbol('dec'),
  INC: Symbol('inc'),
  SET_COUNT: Symbol('setcount'),
  SET_STEP: Symbol('setstep'),
  RESET: Symbol('reset')
})

const initialState = { count: 0, step: 1 }

function reducer(state, action) {
  switch (action.type) {
    case Actions.DEC:
      return { ...state, count: state.count - state.step }
    case Actions.INC:
      return { ...state, count: state.count + state.step }
    case Actions.SET_COUNT:
      return { ...state, count: action.payload }
    case Actions.SET_STEP:
      return { ...state, step: action.payload }
    case Actions.RESET:
      return initialState
    default:
      throw new Error('Unknown action')
  }
}

function DateCounter() {
  //const [count, setCount] = useState(0)
  //const [step, setStep] = useState(1)

  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state

  // This mutates the date object.
  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const dec = function () {
    dispatch({ type: Actions.DEC })
  }

  const inc = function () {
    dispatch({ type: Actions.INC })
  }

  const defineCount = function (e) {
    dispatch({ type: Actions.SET_COUNT, payload: Number(e.target.value) })
  }

  const defineStep = function (e) {
    dispatch({ type: Actions.SET_STEP, payload: Number(e.target.value) })
  }

  const reset = function () {
    dispatch({ type: Actions.RESET })
    //setCount(0)
    //setStep(1)
  }

  return (
    <div className="counter">
      <div>
        <input type="range" min="1" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter
