import type { VariableKeyword } from './keywordTypes'

export interface RootNode {
  type: 'root'
  body: Node[]
}

export interface VariableDeclaration {
  type: 'variableDeclaration'
  keyword: VariableKeyword
  name: string
  value: string
}


export type Node = RootNode | VariableDeclaration

export interface ParserStore {
  rootNode: RootNode
}
