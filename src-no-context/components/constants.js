export const SECS_PER_QUESTION = 30

export const Status = Object.freeze({
  LOADING: Symbol('loading'),
  ERROR: Symbol('error'),
  READY: Symbol('ready'),
  ACTIVE: Symbol('active'),
  FINISHED: Symbol('finished')
})

export const Actions = Object.freeze({
  DATA_RECEIVED: Symbol('datareceived'),
  DATA_FAILED: Symbol('datafailed'),
  START: Symbol('start'),
  NEW_ANSWER: Symbol('newanswer'),
  NEXT_QUESTION: Symbol('nextquestion'),
  FINISH: Symbol('finish'),
  RESTART: Symbol('restart')
})
