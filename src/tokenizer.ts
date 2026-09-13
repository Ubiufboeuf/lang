import { KEY_TOKENS, KEY_VALUE_TOKENS } from './constants/tokenConstants'
import { getText, isNumber, isText } from './lib/utils'
import type { KToken, KTokenType, KVToken, KVTokenType, Token, TokenType } from './types/tokenTypes'

export function tokenize (code: string): Token[] {
  const line = code.replaceAll(/[\n;]/g, ';').replaceAll(/;+/g, ';')
  const partsOfCodeLine = line.split(/(?<=;)/).map(p => p.trim()).filter(Boolean)
  const tokens: Token[] = []

  for (const partOCL of partsOfCodeLine) {
    const groups = partOCL.match(/(?<var_keyword>var)(?<var_name>.*)(?<assign>=)(?<var_value>.*)(?<semicolon>;)/)?.groups

    if (!groups) {
      console.error('No hay grupos capturados')
      continue
    }
   
    for (const [k, v] of Object.entries(groups)) {
      const key = k
      let value = v.trim()

      // console.log(`${key.padEnd(12)}= ${value}`)

      const tokenType = getTokenType(key, value)
      if (!tokenType) continue
      if (tokenType === 'string') value = getText(value) ?? value

      if (isKeyToken(tokenType)) {
        const token: KToken = {
          type: tokenType
        }
        tokens.push(token)
      }

      if (isKeyValueToken(tokenType)) { 
        const token: KVToken = {
          type: tokenType,
          value
        }
        tokens.push(token)
      }
    }
  }

  // console.log('tokens', tokens)
  return tokens
}

function getTokenType (key: string, value: string): TokenType | null {
  // KTokenType
  if (key === 'assign') return 'assign'
  if (key === 'semicolon') return 'semicolon'
  
  // KVTokenType
  if (key === 'var_keyword') return 'keyword'
  if (key === 'var_name') {
    return 'identifier'
  }
  if (key === 'var_value') {
    if (isText(value)) return 'string'
    if (isNumber(value)) return 'number'
    // variable, expresión, etc
  }

  console.error('Token inválido')
  return null
}

function isKeyToken (str: unknown): str is KTokenType {
  return KEY_TOKENS.some((k) => k === str)
}

function isKeyValueToken (str: unknown): str is KVTokenType {
  return KEY_VALUE_TOKENS.some((k) => k === str)
}
