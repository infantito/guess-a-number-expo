import * as React from 'react'
import { Text, StyleSheet } from 'react-native'

import type { FontProps as Props } from '~typings/components'

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
  },
})

const FontFamily = (props: Props) => {
  const { style, children } = props

  return <Text style={[styles.body, style]}>{children}</Text>
}

export default FontFamily
