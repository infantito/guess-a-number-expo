import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import type { HeaderProps as Props } from '~typings/components'
import Title from '~components/title'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#f7287b',
    height: 90,
    justifyContent: 'center',
    paddingTop: 36,
    width: '100%',
  },
})

const Header = (props: Props) => {
  const { title } = props

  return (
    <View style={styles.header}>
      <Title>{title}</Title>
    </View>
  )
}

export default Header
