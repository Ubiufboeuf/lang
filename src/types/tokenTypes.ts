import type { KEY_TOKENS, KEY_VALUE_TOKENS } from '../constants/tokenConstants'

export type KTokenType = typeof KEY_TOKENS[number]
export interface KToken {
  type: KTokenType
}

export type KVTokenType = typeof KEY_VALUE_TOKENS[number]
export interface KVToken {
  type: KVTokenType
  value: string
}

export type TokenType = KTokenType | KVTokenType
export type Token = KVToken | KToken 

export type InComment = 'line' | 'block' | false
export type InString = 'simple' | 'doble' | false

export interface TokenizerStore {
  code: string
  tokens: Token[]
  cursor: number
  acc: string
  inComment: InComment
  inString: InString
}
