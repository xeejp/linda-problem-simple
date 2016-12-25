const initialState = {
  page: "waiting",
  users: {},
  text: null,
  ans_a: 0,
  ans_b: 0,
  ans_each: 0,
  answered: 0,
  joined: 0,
  red_description: 0,
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case "ADD_USER" :
      console.log("ADD_USER")
      return Object.assign({}, state, {
        users: action.users,
        joined: action.joined,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        text: action.text,
        users: action.users,
        ans_a: action.ans_a,
        ans_b: action.ans_b,
        ans_each: action.ans_each,
        joined: action.joined,
        answered: action.answered,
        red_description: action.red_description,
      })

    case "FETCH_CONTENTS":
      console.log("FETCH_CONTENTS")
      return Object.assign({}, state, {
        page: action.page,
        text: action.text,
        users: action.participants,
        ans_a: action.ans_a,
        ans_b: action.ans_b,
        ans_each: action.ans_each,
        answered: action.answered,
        red_description: action.red_description,
        joined: action.joined,
      })

    case "FINISH_DESCRIPTION":
      return Object.assign({}, state, {
        users: action.users,
        red_description: action.red_description,
      })

    case "SUBMIT_ANSWER":
      console.log("ok")
      return Object.assign({}, state, {
        users: action.users,
        ans_a: action.ans_a,
        ans_b: action.ans_b,
        ans_each: action.ans_each,
        answered: action.answered,
        joined: action.joined,
        red_description: action.red_description,
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
