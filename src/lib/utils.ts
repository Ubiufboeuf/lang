import { KEYWORDS } from '../constants/keywordConstants'
import type { Keyword } from '../types/keywordTypes'

export const isKeyword = (str: string): str is Keyword => KEYWORDS.includes(str as Keyword)
export const isText = (str: string) => /('[^']*')|("[^"]*")/.test(str)
export const isNumber = (str: string) => !isNaN(Number(str))
export const getText = (str: string) => {
  const match = str.match(/(?:'(.*)')|(?:"(.*)")/)
  return match ? (match[1] ?? match[2]) : null
}
export function isIdentifier (str: string): boolean {
  if (/^[0-9].*/.test(str)) return false
  return true
}
