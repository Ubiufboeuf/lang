import { tokenizerStore } from './tokenizerStore'

export function accumulateCharacter (char: string) {
  tokenizerStore.acc += char
  tokenizerStore.cursor++
}
