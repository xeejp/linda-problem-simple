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
  ans_programmer: 0,
  ans_banker: 0,
  ans_each: 0,
  join_experiment: 0,
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case "ADD_USER" :
      console.log("ADD_USER")
      return Object.assign({}, state, {
        users: action.users,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        text: action.text,
        users: action.users,
        ans_programmer: action.ans_programmer,
        ans_banker: action.ans_banker,
        ans_each: action.ans_each,
        join_experiment: action.join_experiment,
      })

    case "FETCH_CONTENTS":
      console.log("FETCH_CONTENTS")
      return Object.assign({}, state, {
        page: action.page,
        text: action.text,
        users: action.participants,
        ans_programmer: action.ans_programmer,
        ans_banker: action.ans_banker,
        ans_each: action.ans_each,
        join_experiment: action.join_experiment,
      })

    case "SUBMIT_ANSWER":
      console.log("ok")
      return Object.assign({}, state, {
        users: action.users,
        ans_programmer: action.ans_programmer,
        ans_banker: action.ans_banker,
        ans_each: action.ans_each,
        join_experiment: action.join_experiment,
      })

    case "UPDATE_QUESTION":
      return Object.assign({}, state, {
        text: action.text,
      })

    default:
      return state
  }
}

export default reducer
