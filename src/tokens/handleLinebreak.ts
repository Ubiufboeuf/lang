import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleLinebreak () {
  const { inComment, tokens, acc, inString } = tokenizerStore
  
  if (inComment === 'line') {
    tokenizerStore.inComment = false

    tokens.push({ type: 'line-comment', value: acc })
    
    tokenizerStore.acc = ''
    tokenizerStore.cursor++
    return
  }

  if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
    
  tokenizerStore.acc = ''
  tokenizerStore.cursor++
}
