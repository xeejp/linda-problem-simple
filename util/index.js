export function getPage(page) {
  switch(page) {
    case 'waiting':
      return '待機'
    case 'description':
      return '説明'
    case 'experiment':
      return '実験'
    case 'result':
      return '結果'
    default:
      return page
  }
}

export function getStatus(status) {
  switch(status) {
    case 'programmer':
      return 'プログラマ'
    case 'banker':
      return '銀行員'
    case 'each':
      return 'プログラマで環境保護活動家'
    case 'noactive':
      return '未参加'
    case null:
      return '未選択'
    default:
      return status
  } 
}
