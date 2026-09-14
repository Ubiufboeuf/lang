import { tokenize } from './tokens/tokenizer'
// import { parse } from './parser'
// import { evaluate } from './evaluate'

export function repl (code: string) {
  const tokens = tokenize(code)
  console.log(tokens)
  // const ast = parse(tokens)
  // console.log(ast)
  // evaluate(ast)
}
