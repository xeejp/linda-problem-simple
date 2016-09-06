import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')
export const changePage = createAction('change page', page => page)
export const updateText = createAction('update text', question_text => question_text)
