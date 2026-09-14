import { KEY_TOKENS, KEY_VALUE_TOKENS } from './constants/tokenConstants'
import { isIdentifier, isKeyword, isNumber, isText } from './lib/utils'
import type { KTokenType, KVTokenType, Token, TokenType } from './types/tokenTypes'

type InComment = 'line' | 'block' | false
type InString = 'simple' | 'doble' | false

export function tokenize (code: string): Token[] {
  const tokens: Token[] = []
  let cursor = 0
  let acc = ''
  let inComment: InComment = false
  let inString: InString = false

  while (cursor < code.length) {
    const char = code[cursor]

    if (!char) {
      console.error('No hay carácter')
      continue
    }
    
    if (char === '/') {
      if (code[cursor - 1] === '/') {
        inComment = 'line'
      } else {
        acc = ''
      }

      acc += char
      
      cursor++
      continue
    }

    if (char === ';') {
      if (inString) {
        acc += char
        cursor++
        continue
      }

      if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
      acc = ''

      tokens.push({ type: 'semicolon' })
      
      cursor++
      continue
    }

    if (/[\n\r]/.test(char)) {
      if (inComment === 'line') {
        inComment = false

        tokens.push({ type: 'line-comment', value: acc })
        acc = ''
        
        cursor++
        continue
      }

      if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
      acc = ''

      cursor++
      continue
    }

    if (inComment) {
      acc += char

      cursor++
      continue
    }

    if (/\s/.test(char)) {
      if (inString) {
        acc += char
        cursor++
        continue
      }
      
      if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
      acc = ''

      cursor++
      continue
    }

    if (char === '=') {
      if (inString) {
        acc += char
        cursor++
        continue
      }
      
      if (acc) tokens.push({ type: getAccumulatorType(acc, inString), value: acc })
      acc = ''
      
      tokens.push({ type: 'assign' })
      
      cursor++
      continue
    }

    const isStringLimit = (char === '\'' || char === '"') && code[cursor - 1] !== '\\'

    if (isStringLimit) {
      if (inString === 'simple' && char === '\'') {
        acc += char
        
        tokens.push({ type: getAccumulatorType(acc, inString), value: acc })

        acc = ''
        inString = false
        
        cursor++
        continue
      }

      if (inString === 'doble' && char === '"') {
        acc += char

        tokens.push({ type: getAccumulatorType(acc, inString), value: acc })

        acc = ''
        inString = false

        cursor++
        continue
      }

      if (!inString) {
        inString = char === '\'' ? 'simple' : 'doble'
      }
      
      acc += char
      cursor++
      continue
    }
    
    if (/[0-9]/.test(char)) {
      acc += char
      cursor++
      continue
    }
    
    if (/[A-z]/.test(char)) {
      acc += char
      cursor++
      continue
    }
 
    cursor++
  }

  return tokens
}

function isKeyToken (str: unknown): str is KTokenType {
  return KEY_TOKENS.some((k) => k === str)
}

function isKeyValueToken (str: unknown): str is KVTokenType {
  return KEY_VALUE_TOKENS.some((k) => k === str)
}

function getAccumulatorType (acc: string, inString: InString): TokenType {
  // if (acc.startsWith('//')) return 'line-comment'
  if (inString) return 'string'
  if (isKeyword(acc)) return 'keyword'
  if (isText(acc)) return 'string'
  if (isNumber(acc)) return 'number'
  if (isIdentifier(acc)) return 'identifier'

  console.error(`Error de sintaxis: Identificador inválido '${acc}'`)
  throw new Error('Invalid Token')
}
