import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleSemicolon () {
  const { acc, tokens } = tokenizerStore

  if (acc) tokens.push({ type: getAccumulatorType(acc), value: acc })
  tokens.push({ type: 'semicolon' })
    
  tokenizerStore.acc = ''
  tokenizerStore.cursor++
}
