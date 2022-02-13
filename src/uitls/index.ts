export const capLetter = (str: string) => {
  const firstLetter = str.toLowerCase()[0].toUpperCase()

  const rest = str.toLowerCase().split('').slice(1).join('')

  return firstLetter + rest
}
