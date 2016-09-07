function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case "FETCH_CONTENTS":
      return Object.assign({}, state, {
        page: action.page,
        text: action.text,
        status: action.status,
        ans_a: action.ans_a,
        ans_b: action.ans_b,
        ans_each: action.ans_each,
        answered: action.answered,
        joined: action.joined,
      })

    case "ADD_USER":
      return Object.assign({}, state, {
        joined: action.joined,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        status: action.status,
        ans_a: action.ans_a,
        ans_b: action.ans_b,
        ans_each: action.ans_each,
        answered: action.answered,
        joined: action.joined,
      })

    case "SUBMIT_ANSWER":
      return Object.assign({}, state, {
        status: action.status,
        ans_a: action.ans_a,
        ans_b: action.ans_b,
        ans_each: action.ans_each,
        answered: action.answered,
        joined: action.joined,
      })
      
    case "UPDATE_TEXT":
      return Object.assign({}, state, {
        text: action.text,
      })

    default:
      return state
  }
}

export default reducer
