import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import type { GameOverProps as Props } from '~typings/screens'

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

const GameOver = (props: Props) => {
  const { userNumber, roundsNumber, handleRestart } = props

  return (
    <View style={styles.screen}>
      <Text>Number of rounds: {roundsNumber}</Text>
      <Text>Number was: {userNumber}</Text>
      <Button title="New Game" onPress={handleRestart} />
    </View>
  )
}

export default GameOver
