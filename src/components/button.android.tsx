import * as React from 'react'
import { Text, StyleSheet, Pressable, View } from 'react-native'

import type { ButtonProps as Props } from '~typings/components'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: '#fff',
    borderRadius: 48,
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    textAlign: 'center',
  },
})

const ButtonAndroid = (props: Props) => {
  const { children, handlePress } = props

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default ButtonAndroid
