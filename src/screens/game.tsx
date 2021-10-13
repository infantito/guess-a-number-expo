import * as React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import type { DirectionType, GameProps } from '~typings/screens'
import { Button, Card, NumberContainer } from '~components'
import { DEFAULT_STYLES } from '~constants'
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
    width: 400,
    maxWidth: '90%',
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
      <Text style={DEFAULT_STYLES.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button handlePress={handleNextGuess.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </Button>
        <Button handlePress={handleNextGuess.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </Button>
      </Card>
    </View>
  )
}

export default Game
