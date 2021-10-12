import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import type { CardProps as Props } from '~typings/components'

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
  },
})

const Card = (props: Props) => {
  const { style, children } = props

  return <View style={[styles.card, style]}>{children}</View>
}

export default Card
