import * as React from 'react'
import {
  Button as RNButton,
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  Pressable,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native'

import type { StartGameProps as Props } from '~typings/screens'
import { ButtonAndroid, ButtonIos, Card, FontFamily, Input, NumberContainer, Title } from '~components'
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
    alignItems: 'center',
    maxWidth: '95%',
    minWidth: 300,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },
  input: {
    textAlign: 'center',
    width: 50,
  },
  summaryContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
})

const StartGame = (props: Props) => {
  const { handleStartGame } = props

  const [state, setState] = React.useState({
    value: '',
    isConfirmed: false,
    selectedNumber: null as unknown as number,
  })

  const dimensions = useWindowDimensions()

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

  const Button = Platform.OS === 'ios' ? ButtonIos : ButtonAndroid

  if (isConfirmed) {
    confirmedInput = (
      <Card style={styles.summaryContainer}>
        <FontFamily>You selected</FontFamily>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button handlePress={() => handleStartGame(selectedNumber)}>Start Game</Button>
      </Card>
    )
  }

  const buttonWidth = dimensions.width / 4

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
              <View style={{ width: buttonWidth }}>
                <RNButton onPress={handleReset} color={COLORS.accent} title="Reset" />
              </View>
              <View style={{ width: buttonWidth }}>
                <RNButton onPress={handleConfirm} color={COLORS.primary} title="Confirm" />
              </View>
            </View>
          </Card>
          {confirmedInput}
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGame
