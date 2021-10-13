import type { PressableProps, StyleProp, TextStyle } from 'react-native'
import * as React from 'react'

export type ButtonProps = {
  handlePress: PressableProps['onPress']
  children: React.ReactNode
}
