import { parse } from './ast/parser'
import { tokenize } from './tokens/tokenizer'

export function repl (code: string) {
  const tokens = tokenize(code)
  const ast = parse(tokens)
  console.log(ast)
}
