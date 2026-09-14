import type { TokenizerStore } from '../types/tokenTypes'

export const tokenizerStore: TokenizerStore = {
  code: '',
  tokens: [],
  cursor: 0,
  acc: '',
  inComment: false,
  inString: false
}
