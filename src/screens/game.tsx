import * as React from 'react'
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import type { DirectionType, GameProps, Item } from '~typings/screens'
import { Button, Card, FontFamily, NumberContainer } from '~components'
import { DEFAULT_STYLES } from '~constants'
import { generateRandomBetween } from '~utils'

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    maxWidth: '90%',
    width: 400,
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    width: '100%',
  },
})

const renderListItem = (listLength: number, itemData: { index: number; item: Item }) => {
  return (
    <View style={styles.listItem}>
      <FontFamily>#{listLength - itemData.index}</FontFamily>
      <FontFamily>{itemData.item.value}</FontFamily>
    </View>
  )
}

const Game = (props: GameProps) => {
  const { userChoice, handleGameOver } = props

  const currentLow = React.useRef(1)

  const currentHight = React.useRef(100)

  const [state, setState] = React.useState(() => {
    const item: Item = {
      id: Date.now().toString(36),
      value: generateRandomBetween(currentLow.current, currentHight.current, userChoice),
    }

    return {
      currentGuess: item,
      guesses: [item] as Item[],
    }
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const { currentGuess, guesses } = state

  React.useEffect(() => {
    if (currentGuess.value === userChoice) {
      handleGameOver(guesses.length)
    }
  }, [currentGuess, userChoice])

  const handleNextGuess = (direction: DirectionType) => {
    if (
      (direction === 'lower' && currentGuess.value < userChoice) ||
      (direction === 'greater' && currentGuess.value > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])

      return
    }

    if (direction === 'lower') {
      currentHight.current = currentGuess.value
    } else {
      currentLow.current = currentGuess.value
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess.value)

    const nextItem: Item = {
      id: Date.now().toString(36),
      value: nextNumber,
    }

    updater({ currentGuess: nextItem, guesses: [nextItem, ...guesses] })
  }

  return (
    <View style={styles.screen}>
      <Text style={DEFAULT_STYLES.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess.value}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button handlePress={handleNextGuess.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </Button>
        <Button handlePress={handleNextGuess.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </Button>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item.id}
          data={guesses}
          renderItem={renderListItem.bind(this, guesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

export default Game
