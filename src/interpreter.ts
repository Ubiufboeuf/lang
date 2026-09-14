import { tokenize } from './tokens/tokenizer'
// import { parse } from './parser'
// import { repl } from './repl'

export function interpret (code: string) {
  const tokens = tokenize(code)
  console.log(tokens)
  // const ast = parse(tokens)
  // console.log(ast)
  // repl(ast)
}
