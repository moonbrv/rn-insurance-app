import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/PickerFieldStyle'
import ModalSelector from 'react-native-modal-selector'
import InputField from './InputField'
import * as R from 'ramda'

export default class PickerField extends Component {
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

  render () {
    const {input, ...custom} = this.props
    const initValue = R.pathOr('', [0, 'title'], custom.dataSet)

    return (
      <View style={styles.container}>
        <ModalSelector
          animationType='fade'
          data={custom.dataSet}
          initValue={initValue}
          keyExtractor={R.prop('pageid')}
          labelExtractor={R.prop('title')}
          {...input}
          {...custom}
          onChange={R.compose(
            input.onChange,
            R.prop('title')
          )}
        >
          <InputField
            {...input}
            {...custom}
          />
        </ModalSelector>
      </View>
    )
  }
}
