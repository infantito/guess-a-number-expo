import * as React from 'react'
import { Text, StyleSheet } from 'react-native'

import type { TitleProps as Props } from '~typings/components'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
})

const Title = (props: Props) => {
  const { style, children } = props

  return <Text style={[styles.title, style]}>{children}</Text>
}

export default Title
