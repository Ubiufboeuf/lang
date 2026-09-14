import { KEY_TOKENS, KEY_VALUE_TOKENS } from '../constants/tokenConstants'
import { isIdentifier, isKeyword, isNumber, isText } from '../lib/utils'
import type { InString, KTokenType, KVTokenType, Token, TokenType } from '../types/tokenTypes'
import { handleString } from './handleString'
import { handleSeparator } from './handleSeparator'
import { accumulateCharacter } from './accumulateCharacter'
import { tokenizerStore } from './tokenizerStore'
import { handleLinebreak } from './handleLinebreak'
import { handleSemicolon } from './handleSemicolon'
import { handleComment } from './handleComment'

export function tokenize (code: string): Token[] {
  tokenizerStore.code = code
  
  while (tokenizerStore.cursor < code.length) {
    const char = code[tokenizerStore.cursor]

    if (!char) {
      console.error('No hay carácter')
      continue
    }
    
    if (char === '/') {
      handleComment()
      continue
    }

    if (char === ';') {
      handleSemicolon()
      continue
    }

    if (/[\n\r]/.test(char)) {
      handleLinebreak()
      continue
    }

    if (tokenizerStore.inComment) {
      accumulateCharacter(char)
      continue
    }

    if (/\s/.test(char) || char === '=') {
      handleSeparator(char)
      continue
    }

    const isStringLimit = (char === '\'' || char === '"') && code[tokenizerStore.cursor - 1] !== '\\'
    if (isStringLimit) {
      handleString(char)
      continue
    }
    
    if (/[0-9|A-z]/.test(char)) {
      accumulateCharacter(char)
      continue
    }
 
    tokenizerStore.cursor++
  }

  return tokenizerStore.tokens
}

export function isKeyToken (str: unknown): str is KTokenType {
  return KEY_TOKENS.some((k) => k === str)
}

export function isKeyValueToken (str: unknown): str is KVTokenType {
  return KEY_VALUE_TOKENS.some((k) => k === str)
}

export function getAccumulatorType (acc: string, inString: InString): TokenType {
  // if (acc.startsWith('//')) return 'line-comment'
  if (inString) return 'string'
  if (isKeyword(acc)) return 'keyword'
  if (isText(acc)) return 'string'
  if (isNumber(acc)) return 'number'
  if (isIdentifier(acc)) return 'identifier'

  console.error(`Error de sintaxis: Identificador inválido '${acc}'`)
  throw new Error('Invalid Token')
}
