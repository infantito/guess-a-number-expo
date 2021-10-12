import * as React from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'

import type { DirectionType, GameProps } from '~typings/screens'
import { Card, NumberContainer } from '~components'
import { generateRandomBetween } from '~utils'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
})

const Game = (props: GameProps) => {
  const { userChoice, handleGameOver } = props

  const currentLow = React.useRef(1)

  const currentHight = React.useRef(100)

  const [state, setState] = React.useState(() => ({
    currentGuess: generateRandomBetween(currentLow.current, currentHight.current, userChoice),
    rounds: 0,
  }))

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const { currentGuess, rounds } = state

  React.useEffect(() => {
    if (currentGuess === userChoice) {
      handleGameOver(rounds)
    }
  }, [currentGuess, userChoice])

  const handleNextGuess = (direction: DirectionType) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])

      return
    }

    if (direction === 'lower') {
      currentHight.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess)

    updater({ currentGuess: nextNumber, rounds: rounds + 1 })
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={handleNextGuess.bind(this, 'lower')} />
        <Button title="Greater" onPress={handleNextGuess.bind(this, 'greater')} />
      </Card>
    </View>
  )
}

export default Game
