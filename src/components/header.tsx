import * as React from 'react'
import { View, Text, StyleSheet, Platform, ViewStyle } from 'react-native'

import type { HeaderProps as Props } from '~typings/components'
import Title from '~components/title'
import { COLORS } from '~constants'

const styles = StyleSheet.create({
  headerBase: {
    alignItems: 'center',
    backgroundColor: '#f7287b',
    height: 90,
    justifyContent: 'center',
    paddingTop: 36,
    width: '100%',
  },
  headerAndroid: {
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  headerIos: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  } as ViewStyle,
  title: {
    color: Platform.OS === 'ios' ? COLORS.primary : '#fff',
  },
})

const Header = (props: Props) => {
  const { title } = props

  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Title style={styles.title}>{title}</Title>
    </View>
  )
}

export default Header
