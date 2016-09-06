import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({}) => ({
})

class QuestionText extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return <div>
      <p>リンダは31歳です。独身です。</p>
      <p>社交的でとても陽気な性格です。彼女は哲学を専攻しました。</p>
      <p>学生時代には、差別や社会的正義について深い関心をもち、反原発運動にも参加していました。</p>
      <p>次の各項目の順序を、最もあり得るものを1番目に、最もあり得ないものを8番目に来るように並び替えてください。</p>
      <p>リンダは小学校の教師をしている。</p>
      <p>リンダは本屋で働いており、ヨガの教室に通っている。</p>
      <p>リンダはフェミニスト活動家である。</p>
      <p>リンダは精神病院で働いている。</p>
      <p>リンダは「女性有権者の会」の会員である。</p>
      <p>リンダは銀行の窓口係である。</p>
　　　<p>リンダは保険外交員である。</p>
      <p>リンダは銀行の窓口係で、フェミニスト活動家である。</p>
    </div>
  }
}

export default connect()(QuestionText)
