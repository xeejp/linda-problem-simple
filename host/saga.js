import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, changePage, updateText } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    console.log("change page")
    yield call(sendData, 'change page', payload)
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* updateTextSaga() {
  while(true) {
    const { payload } = yield take(`${updateText}`)
    yield call(sendData, 'update text', payload)
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(fetchContentsSaga)
  yield fork(updateTextSaga)
}

export default saga
