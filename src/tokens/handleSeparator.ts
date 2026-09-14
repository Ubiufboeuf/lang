import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleSeparator (char: string) {
  const { inString, acc, tokens } = tokenizerStore
  
  if (inString) {
    tokenizerStore.acc += char
    tokenizerStore.cursor++
    return
  }
  
  if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
  if (char === '=') tokens.push({ type: 'assign' })
    
  tokenizerStore.acc = ''
  tokenizerStore.cursor++
}
