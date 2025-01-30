import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import Question from './Question'
import NextButton from './NextButton'
import { useEffect, useReducer } from 'react'
import StartScreen from './StartScreen'
import Progress from './Progress'
import Footer from './Footer'
import FinishedScreen from './FinishedScreen'
import Timer from './Timer'
import { Status, Actions, SECS_PER_QUESTION } from './constants'
import { useQuiz } from '../providers/QuizProvider'

export default function App() {
  const { status } = useQuiz()

  return (
    <div className="app">
      <Header />
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <Error />}
        {status === Status.READY && <StartScreen />}
        {status === Status.ACTIVE && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && <FinishedScreen />}
      </Main>
    </div>
  )
}
