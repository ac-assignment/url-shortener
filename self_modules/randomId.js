const randomId = function(url) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '0123456789'
  const collection = [
    ...lowerCaseLetters,
    ...upperCaseLetters,
    ...numbers
  ]
  
  let result = []
  for (let i = 0; i < 5; i++) {
    result[i] = sample(collection)
  }
  return result.join('')
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

export default randomId