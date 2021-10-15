import * as React from 'react'
import { View, Text, StyleSheet, Image, Platform, ScrollView, Dimensions } from 'react-native'

import type { GameOverProps as Props } from '~typings/screens'
import { ButtonAndroid, ButtonIos, FontFamily, Title } from '~components'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    borderColor: 'black',
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    height: Dimensions.get('window').width * 0.7,
    marginVertical: Dimensions.get('window').height / 30,
    overflow: 'hidden',
    width: Dimensions.get('window').width * 0.7,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  resultContainer: {
    marginHorizontal: 28,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
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
    <ScrollView>
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
    </ScrollView>
  )
}

export default GameOver
