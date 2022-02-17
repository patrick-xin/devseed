export const capLetter = (str: string) => {
  const firstLetter = str.toLowerCase()[0].toUpperCase()

  const rest = str.toLowerCase().split('').slice(1).join('')

  return firstLetter + rest
}

export const capLetters = (str: string) => {
  const words = str.toLowerCase().split(' ')
  const result = words.map((word) => capLetter(word)).join(' ')

  return result
}

export const calcTime = () => {
  const today = new Date()
  const curHr = today.getHours()
  let result
  if (curHr < 12) {
    result = 'good morning'
  } else if (curHr < 18) {
    result = 'good afternoon'
  } else {
    result = 'good evening'
  }
  return result
}
