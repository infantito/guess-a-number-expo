import type { TextInputProps } from 'react-native'
import * as React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { InputProps as Props } from '~typings/components'

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 30,
    marginVertical: 10,
  },
})

const Input = (props: Props) => {
  const { style, ...inputProps } = props

  return <TextInput {...inputProps} style={[styles.input, style]} />
}

export default Input
