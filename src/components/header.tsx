import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import type { HeaderProps as Props } from '~typings/components'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#f7287b',
    height: 90,
    justifyContent: 'center',
    paddingTop: 36,
    width: '100%',
  },
  title: {
    color: '#000',
    fontSize: 18,
  },
})

const Header = (props: Props) => {
  const { title } = props

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header
