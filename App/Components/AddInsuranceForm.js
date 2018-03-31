import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import InputField from './InputField'
import styles from './Styles/AddInsuranceFormStyle'
import { Button } from 'react-native-elements'
import { Colors } from '../Themes'

import {
  required,
  number,
  positiveValue,
  onlyNumericCharacters
} from '../Services/ReduxFormValidators'

class AddInsuranceForm extends Component {
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

  renderTextInput = props => {
    return (
      <Field
        component={InputField}
        {...props}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderTextInput({
          name: 'insuranceName',
          label: 'Insurance Name',
          placeholder: 'Please Enter Insurance Name',
          validate: [required]
        })}
        {this.renderTextInput({
          name: 'yearlyPremium',
          label: 'Yearly Premium',
          placeholder: 'Please Entery Early Premium',
          keyboardType: 'phone-pad',
          validate: [
            required,
            number,
            positiveValue,
            onlyNumericCharacters
          ]
        })}
        <View style={styles.btnWrapper}>
          <Button
            title='Done'
            icon={{name: 'check', size: 28}}
            onPress={this.props.handleSubmit}
            backgroundColor={Colors.primaryBlue}
            borderRadius={5}
            fontSize={20}
          />
        </View>
      </View>
    )
  }
}

export default reduxForm({form: 'addInsuranceForm'})(AddInsuranceForm)
