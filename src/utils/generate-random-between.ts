const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  const minNumber = Math.ceil(min)

  const maxNumber = Math.ceil(max)

  const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber)) + min

  if (randomNumber === exclude) {
    return generateRandomBetween(minNumber, maxNumber, exclude)
  }

  return randomNumber
}

export default generateRandomBetween
