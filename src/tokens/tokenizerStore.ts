import type { TokenizerStore } from '../types/tokenTypes'

export const tokenizerStore: TokenizerStore = {
  code: '',
  tokens: [],
  cursor: 0,
  acc: '',
  inComment: false,
  inString: false,
  reset () {
    this.code = ''
    this.tokens = []
    this.cursor = 0
    this.acc = ''
    this.inComment = false
    this.inString = false
  }
}
