const initialState = {
  page: "waiting",
  users: {},
  text: {
    descriptions: [
      {id: 0, text: "説明1",},
      {id: 1, text: "説明2",},
      {id: 2, text: "説明3",},
    ],
    question: "リンダは31歳です。独身です。\n社交的でとても陽気な性格です。彼女は哲学を専攻しました。\n学生時代には、差別や社会的正義について深い関心をもち、反原発運動にも参加していました。\n次の各項目の順序を、最もあり得るものを1番目に、最もあり得ないものを8番目に来るように並び替えてください。",
    answers: [
      "プログラマ",
      "銀行員",
      "プログラマで自然保護活動家",
    ]
  },
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
