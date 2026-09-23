import { isNumber } from '../lib/utils'
import { getAccumulatorType } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleNumber (char: string) {
  const { code, tokens } = tokenizerStore
  let { acc, cursor } = tokenizerStore

  const endOfNumber = findEndOfNumber(char, cursor, code)
  if (!endOfNumber) {
    throw new Error('Número mal armado')
  }

  while (cursor < endOfNumber) {
    const char = code[cursor]
    if (!char) continue

    acc += char
    cursor++
  }

  tokens.push({ type: getAccumulatorType(acc), value: acc })

  tokenizerStore.acc = ''
  tokenizerStore.cursor = cursor + 1
}

function findEndOfNumber (char: string, cursor: number, code: string) {
  let internalCursor = cursor
  let endOfNumber = undefined

  while (internalCursor < code.length) {
    const internalChar = code[internalCursor]
    const nextInternalChar = code[internalCursor + 1]

    if (!internalChar) continue

    if (/;|\s/.test(internalChar)) {
      endOfNumber = internalCursor
      break
    }
    
    if (!nextInternalChar && isNumber(internalChar)) {
      endOfNumber = internalCursor + 1
      break
    }

    internalCursor++
  }
  
  return endOfNumber
}
