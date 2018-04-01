import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/InputFieldStyle'
import * as R from 'ramda'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Colors } from '../Themes'

export default class InputField extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  focusInput () {
    this.input.focus()
  }

  render () {
    const {input, ...custom} = this.props
    const label = R.pathOr(R.prop('name', input), ['label'], custom)

    const {invalid, error, touched} = custom.meta

    const isError = R.and(invalid, touched)

    const labelStyle = isError ? styles.labelError : null

    const underLineColor = isError ? Colors.error : Colors.inputGrey

    const generateError = () => {
      const errorBlock = (
        <View style={styles.errorMsgWrapper}>
          <FormValidationMessage labelStyle={labelStyle}>
            {error}
          </FormValidationMessage>
        </View>
      )
      return isError ? errorBlock : null
    }


    return (
      <View style={styles.container}>
        <FormLabel labelStyle={labelStyle}>{ label }</FormLabel>
        <FormInput
          inputStyle={labelStyle}
          ref={input => { this.input = input }}
          {...input}
          {...custom}
          underlineColorAndroid={underLineColor}
        />
        { generateError() }
      </View>
    )
  }
}
