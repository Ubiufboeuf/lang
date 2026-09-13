export const isText = (str: string) => Boolean(str.match(/('.*')|(".*")/))
export const isNumber = (str: string) => !isNaN(Number(str))
export const getText = (str: string) => {
  const match = str.match(/(?:'(.*)')|(?:"(.*)")/)
  return match ? (match[1] ?? match[2]) : null
}
