import * as React from 'react'
import { View, Text, StyleSheet, Alert, Keyboard, Pressable } from 'react-native'

import type { StartGameProps as Props } from '~typings/screens'
import { Button, Card, Input, NumberContainer, Title } from '~components'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
})

const StartGame = (props: Props) => {
  const { handleStartGame } = props

  const [state, setState] = React.useState({
    value: '',
    isConfirmed: false,
    selectedNumber: null as unknown as number,
  })

  const { value, isConfirmed, selectedNumber } = state

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const handleChange = (newValue: string) => {
    updater({ value: newValue.replace(/[^0-9]/g, '') })
  }

  const handleReset = () => {
    updater({ value: '', isConfirmed: false })
  }

  const handleConfirm = () => {
    const chosenNumber = parseInt(value)

    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: handleReset,
        },
      ])

      return
    }

    updater({ isConfirmed: true, value: '', selectedNumber: chosenNumber })

    Keyboard.dismiss()
  }

  let confirmedInput: React.ReactNode = null

  if (isConfirmed) {
    confirmedInput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button handlePress={() => handleStartGame(selectedNumber)}>Start Game</Button>
      </Card>
    )
  }

  return (
    <Pressable style={styles.screen} onPress={() => Keyboard.dismiss()}>
      <Title style={styles.title}>Start a New Game!</Title>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <Input
          style={styles.input}
          blurOnSubmit={true}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={handleChange}
          value={value}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button handlePress={handleReset} color={COLORS.accent}>
              Reset
            </Button>
          </View>
          <View style={styles.button}>
            <Button handlePress={handleConfirm} color={COLORS.primary}>
              Confirm
            </Button>
          </View>
        </View>
      </Card>
      {confirmedInput}
    </Pressable>
  )
}

export default StartGame
