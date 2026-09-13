import { interpret } from './src/interpreter'
import { hmr } from './src/hmr'

hmr('index.zen', (code) => interpret(code), { execOnLoad: true })
