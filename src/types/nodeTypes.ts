export interface StringLiteral {
  type: 'StringLiteral'
  value: string
}

export interface NumericLiteral {
  type: 'NumericLiteral'
  value: number
}

export interface VariableDeclaration {
  type: 'VariableDeclaration'
  identifier: string
  initializer: Initializer | undefined
}

export type Initializer = StringLiteral | NumericLiteral
export type Node = VariableDeclaration

export type AST = Node[]
