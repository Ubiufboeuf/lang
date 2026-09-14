import { repl } from './src/interpreter'
import { hmr } from './src/hmr'

hmr('index.zen', (code) => repl(code), { execOnLoad: true })
