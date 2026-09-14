import { tokenizerStore } from './tokenizerStore'

export function handleComment () {
  const { code, cursor } = tokenizerStore
  
  if (code[cursor - 1] === '/') {
    tokenizerStore.inComment = 'line'
  } else {
    tokenizerStore.acc = ''
  }

  tokenizerStore.acc += '/'
  tokenizerStore.cursor++
}
