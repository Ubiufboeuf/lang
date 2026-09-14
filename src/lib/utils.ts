import { KEYWORDS } from '../constants/tokenConstants'
import type { Keyword } from '../types/tokenTypes'

export const isKeyword = (str: string) => KEYWORDS.includes(str as Keyword)
export const isText = (str: string) => Boolean(str.match(/('.*')|(".*")/))
export const isNumber = (str: string) => !isNaN(Number(str))
export const getText = (str: string) => {
  const match = str.match(/(?:'(.*)')|(?:"(.*)")/)
  return match ? (match[1] ?? match[2]) : null
}
export function isIdentifier (str: string): boolean {
  if (/^[0-9].*/.test(str)) return false
  return true
}
