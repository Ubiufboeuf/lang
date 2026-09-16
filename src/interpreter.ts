import { tokenize } from './tokens/tokenizer'

export function repl (code: string) {
  const tokens = tokenize(code)
  console.log(tokens)
  // const ast = parse(tokens)
  // evaluate(ast)
}
