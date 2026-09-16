import { getAccumulatorType, getEscapeChar, isEscapeChar } from './tokenizer'
import { tokenizerStore } from './tokenizerStore'

export function handleString (char: string) {
  const { code, tokens } = tokenizerStore
  let { acc, cursor } = tokenizerStore

  const result = findEndOfString(char, cursor, code)
  if (!result?.endOfString) {
    throw new Error('String mal armado')
  }

  const { endOfString, escapeChars } = result

  while (cursor < endOfString) {
    const char = code[cursor]
    if (!char) continue

    if (escapeChars.includes(cursor)) {
      
      acc += getEscapeChar(char)
      cursor++
      continue
    }

    if (char !== '\\') acc += char
    cursor++
  }

  
  tokens.push({ type: getAccumulatorType(acc), value: acc.slice(1, -1) })
  
  tokenizerStore.acc = ''
  tokenizerStore.cursor = cursor
}

interface EndOfString {
  endOfString: number
  escapeChars: number[]
}

function findEndOfString (char: string, cursor: number, code: string): EndOfString | undefined {
  let internalCursor = cursor + 1
  let endOfString
  const escapeChars: number[] = []

  while (internalCursor < code.length) {
    const internalChar = code[internalCursor]
    const nextInternalChar = code[internalCursor + 1]

    if (internalChar === '\\' && nextInternalChar && isEscapeChar(internalChar)) {
      const escapeChar = getEscapeChar(nextInternalChar)
      if (!escapeChar) {
        throw new Error('Error inesperado. Carácter de escape inválido')
      }
      
      escapeChars.push(internalCursor + 1)
      
      internalCursor += 2
      continue
    }

    if (internalChar === char) {
      endOfString = internalCursor + 1
      return { endOfString, escapeChars }
    }

    internalCursor++
  }
  
  return undefined
}
