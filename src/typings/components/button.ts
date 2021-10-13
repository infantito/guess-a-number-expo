import type { ButtonProps as RNButtonProps } from 'react-native'
import * as React from 'react'

export type ButtonProps = {
  handlePress: () => void
  children: React.ReactNode
} & Pick<RNButtonProps, 'color'>
