import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import type { NumberContainerProps as Props } from '~typings/components'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: COLORS.accent,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
  },
  number: {
    color: COLORS.accent,
    fontSize: 22,
  },
})

const NumberContainer = (props: Props) => {
  const { children } = props

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  )
}

export default NumberContainer
