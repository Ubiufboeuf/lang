import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleString (char: string) {
  const { tokens, inString } = tokenizerStore
  let { acc } = tokenizerStore
  
  if (inString === 'simple' && char === '\'') {
    acc += char
    
    tokens.push({ type: getAccumulatorType(acc, inString), value: acc })

    tokenizerStore.acc = ''
    tokenizerStore.inString = false
    tokenizerStore.cursor++
    return
  }

  if (inString === 'doble' && char === '"') {
    acc += char

    tokens.push({ type: getAccumulatorType(acc, inString), value: acc })

    tokenizerStore.acc = ''
    tokenizerStore.inString = false
    tokenizerStore.cursor++
    return
  }

  if (!inString) {
    tokenizerStore.inString = char === '\'' ? 'simple' : 'doble'
  }

  tokenizerStore.acc += char
  tokenizerStore.cursor++
}
