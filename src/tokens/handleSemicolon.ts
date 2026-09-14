import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleSemicolon () {
  const { inString, acc, tokens } = tokenizerStore
  
  if (inString) {
    tokenizerStore.acc += ';'
    tokenizerStore.cursor++
    return
  }

  if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
  tokens.push({ type: 'semicolon' })
    
  tokenizerStore.acc = ''
  tokenizerStore.cursor++
}
