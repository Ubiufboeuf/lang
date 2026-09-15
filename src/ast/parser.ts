import { VARIABLE_KEYWORDS } from '../constants/keywordConstants'
import type { Keyword, VariableKeyword } from '../types/keywordTypes'
import type { KVToken, Token } from '../types/tokenTypes'
import { parserStore } from './parserStore'


export function parse (tokens: Token[]) {
  parserStore.rootNode = {
    type: 'root',
    body: []
  }
  const { rootNode } = parserStore
  
  let cursor = 0

  while (cursor < tokens.length) {
    const token = tokens[cursor]
    
    if (!token) {
      console.error('No hay token')  
      continue
    }

    const tokenType = token.type

    if (tokenType === 'line-comment') {
      cursor++
      continue
    }
    
    if (tokenType === 'keyword') {
      handleKeyword(cursor, token.value as Keyword, tokens)
      cursor++
      continue
    }

    cursor++
  }
  
  return rootNode
}

function handleKeyword (cursor: number, tokenValue: Keyword, tokens: Token[]) {
  if (isVariableKeyword(tokenValue)) handleVarKeyword(cursor, tokens)
}

function handleVarKeyword (cursor: number, tokens: Token[]) {
  const [keyword, name, assign, value] = tokens.slice(cursor, cursor + 4)  
  if (
    name?.type !== 'identifier' || assign?.type !== 'assign' ||
    keyword?.type !== 'keyword' || !isVariableKeyword(keyword.value) ||
    !isVarContent(value)
  ) {
    console.error('Declaración de variable incorrecta')
    return
  }
  
  parserStore.rootNode.body.push({
    type: 'variableDeclaration',
    keyword: keyword.value,
    name: name.value,
    value: value.value
  })
}

function isVarContent (token: Token | undefined): token is KVToken {
  if (!token) return false
  const { type } = token
  return type === 'string' || type === 'number'
}

export function isVariableKeyword (str: string): str is VariableKeyword {
  return VARIABLE_KEYWORDS.includes(str as VariableKeyword)
}
