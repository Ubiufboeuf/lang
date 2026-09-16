import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleSeparator (char: string) {
  const { acc, tokens } = tokenizerStore
  
  if (acc) tokens.push({ type: getAccumulatorType(acc), value: acc })
  if (char === '=') tokens.push({ type: 'assign' })
    
  tokenizerStore.acc = ''
  tokenizerStore.cursor++
}
