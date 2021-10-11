import { registerRootComponent } from 'expo'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

const App = () => {
  return (
    <View style={styles.screen}>
      <Text>Guess a Number</Text>
    </View>
  )
}

export default registerRootComponent(App)
