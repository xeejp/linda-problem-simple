import { ReadJSON, LineBreak } from '../util/ReadJSON'

export function getPage(page) {
  const multi_text = ReadJSON().static_text
  switch(page) {
    case 'waiting':
      return multi_text["page_text"]["waiting"]
    case 'description':
      return multi_text["page_text"]["description"]
    case 'experiment':
      return multi_text["page_text"]["experiment"]
    case 'result':
      return multi_text["page_text"]["result"]
    default:
      return page
  }
}

export function getStatus(status) {
  const multi_text = ReadJSON().static_text
  switch(status) {
    case 'programmer':
      return multi_text["status_text"]["programmer"]
    case 'banker':
      return multi_text["status_text"]["banker"]
    case 'each':
      return multi_text["status_text"]["each"]
    case 'noactive':
      return multi_text["status_text"]["noactive"]
    case null:
      return multi_text["status_text"]["null"]
    default:
      return status
  } 
}
