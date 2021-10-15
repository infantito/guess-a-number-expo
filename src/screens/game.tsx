import * as React from 'react'
import { View, Text, StyleSheet, Alert, FlatList, Platform, Dimensions, useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation'

import type { DirectionType, GameProps, Item } from '~typings/screens'
import { ButtonAndroid, ButtonIos, Card, FontFamily, NumberContainer } from '~components'
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    maxWidth: '90%',
    width: 400,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
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
  /**
   * @description the next line keeps `PORTRAIT` mode
   */
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

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

  const dimensions = useWindowDimensions()

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

  const listContainerStyle = dimensions.width < 350 ? styles.listContainerBig : styles.listContainer

  const Button = Platform.OS === 'ios' ? ButtonIos : ButtonAndroid

  if (dimensions.width < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DEFAULT_STYLES.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <Button handlePress={handleNextGuess.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </Button>
          <NumberContainer>{currentGuess.value}</NumberContainer>
          <Button handlePress={handleNextGuess.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </Button>
        </View>
        <View style={listContainerStyle}>
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
      <View style={listContainerStyle}>
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
