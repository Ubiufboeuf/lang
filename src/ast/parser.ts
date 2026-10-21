import type { AST, VariableDeclaration } from '../types/nodeTypes'
import type { Token } from '../types/tokenTypes'

export function parse (tokens: Token[]): AST {
  const ast: AST = []
  let cursor = 0

  function currentToken () {
    return tokens[cursor]
  }

  function consume () {
    return tokens[cursor++]
  }

  function parseVariableDeclaration (): VariableDeclaration {
    const identifier = consume()
    console.log('identifier:', identifier)

    if (identifier?.type !== 'identifier') {
      throw new Error('Se esperaba una declaración de variable')
    }

    let initializer: VariableDeclaration['initializer']

    if (currentToken()?.type === 'assign') {
      consume()
      const value = consume()

      if (!value) {
        throw new Error('Se esperaba una expresión')
      }

      if (value.type === 'identifier' && value.value === identifier.value) {
        throw new Error('No se puede asignar una variable a si misma')
      }
      
      if (value?.type === 'string') {
        initializer = {
          type: 'StringLiteral',
          value: String(value.value)
        }
      }
      
      if (value?.type === 'number') {
        initializer = {
          type: 'NumericLiteral',
          value: Number(value.value)
        }
      }

      console.log('value:', value)
    }

    return {
      type: 'VariableDeclaration',
      identifier: identifier.value,
      initializer
    }
  }

  while (cursor < tokens.length) {
    const token = consume()
    console.log('token:', token)

    if (token?.type === 'keyword' && token.value === 'var') {
      ast.push(parseVariableDeclaration())
    } else {
      const val = token && 'value' in token ? token.value : token?.type
      throw new Error(`Token inesperado: ${val}`)
    }
  }
  
  return ast
}
