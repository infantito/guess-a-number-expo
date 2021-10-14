import * as React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'

import type { GameOverProps as Props } from '~typings/screens'
import { ButtonAndroid, ButtonIos, FontFamily, Title } from '~components'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    borderColor: 'black',
    borderRadius: 150,
    borderWidth: 3,
    height: 200,
    marginVertical: 28,
    overflow: 'hidden',
    width: 200,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  resultContainer: {
    marginHorizontal: 28,
    marginBottom: 16,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: 'open-sans-bold',
  },
})

const GameOver = (props: Props) => {
  const { userNumber, roundsNumber, handleRestart } = props

  const Button = Platform.OS === 'ios' ? ButtonIos : ButtonAndroid

  return (
    <View style={styles.screen}>
      <Title>The Game is Over!</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('~assets/images/deadpool.jpeg')} resizeMode="cover" />
      </View>
      <View style={styles.resultContainer}>
        <FontFamily style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </FontFamily>
      </View>
      <Button handlePress={handleRestart}>New Game</Button>
    </View>
  )
}

export default GameOver
