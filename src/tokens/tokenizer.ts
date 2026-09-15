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
import { ESCAPE_CHARS } from '../constants/escapeConstants'
import type { EscapeChar } from '../types/escapeTypes'

export function tokenize (code: string): Token[] {
  tokenizerStore.code = code
  
  while (tokenizerStore.cursor < code.length) {
    const char = code[tokenizerStore.cursor]
    const nextChar = code[tokenizerStore.cursor + 1]

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

    const isStringLimit = (char === '\'' || char === '"')
    if (isStringLimit) {
      handleString(char)
      continue
    }

    if (char === '\\' && nextChar && isEscapeChar(char)) {
      const escapeChar = getEscapeChar(nextChar)
      if (!escapeChar) {
        throw new Error('Error inesperado. Carácter de escape inválido')
      }
      accumulateCharacter(escapeChar)
      tokenizerStore.cursor++
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

export function isEscapeChar (char: string): char is EscapeChar {
  return Boolean(ESCAPE_CHARS.includes(char as EscapeChar))
}

export function getEscapeChar (char: string): string | undefined {
  if (char === 'n') return '\n'
  if (char === 't') return '\t'
  if (char === 'r') return '\r'
  if (char === 'b') return '\b'
  if (char === 'f') return '\f'
  if (char === 'v') return '\v'
  if (char === '0') return '\0'
  if (char === '\\') return '\\'
  if (char === '\'') return '\''
  if (char === '"') return '"'
  
  return undefined
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
