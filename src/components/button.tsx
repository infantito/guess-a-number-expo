import * as React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

import type { ButtonProps as Props } from '~typings/components'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
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

const Button = (props: Props) => {
  const { children, handlePress } = props

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default Button
