import { registerRootComponent } from 'expo'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Game, GameOver, StartGame } from '~screens'
import { Header } from '~components'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

const App = () => {
  const [state, setState] = React.useState({
    userNumber: null as unknown as number,
    guessRounds: 0,
  })

  const { userNumber, guessRounds } = state

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const handleRestart = () => {
    updater({ guessRounds: 0, userNumber: null as unknown as number })
  }

  const handleStartGame = (selectedNumber: number) => {
    updater({ userNumber: selectedNumber })
  }

  const handleGameOver = (numOfRounds: number) => {
    updater({ guessRounds: numOfRounds })
  }

  let content = <StartGame handleStartGame={handleStartGame} />

  if (userNumber && guessRounds <= 0) {
    content = <Game userChoice={userNumber} handleGameOver={handleGameOver} />
  } else if (guessRounds > 0) {
    content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} handleRestart={handleRestart} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  )
}

export default registerRootComponent(App)
