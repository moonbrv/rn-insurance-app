import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm, touch } from 'redux-form'
import InputField from './InputField'
import PickerField from './PickerField'
import styles from './Styles/AddInsuranceFormStyle'
import { Button } from 'react-native-elements'
import { Colors } from '../Themes'
import { compose, pathOr, path } from 'ramda'
import { NavigationActions } from 'react-navigation'

import {
  required,
  number,
  positiveValue
} from '../Services/ReduxFormValidators'

const formName = 'addInsuranceForm'

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

  submitData = (values) => {
    const {
      validateForm,
      handleSubmit,
    } = this.props
    validateForm()
    handleSubmit(values)
  }

  renderField = (props, comp = InputField) => {
    return (
      <Field
        component={comp}
        {...props}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderField({
          name: 'insuranceName',
          label: 'Insurance Name',
          placeholder: 'Please Enter Insurance Name',
          validate: [required]
        })}
        {this.renderField({
          name: 'yearlyPremium',
          label: 'Yearly Premium',
          placeholder: 'Please Entery Early Premium',
          keyboardType: 'phone-pad',
          validate: [
            required,
            number,
            positiveValue
          ]
        })}
        {this.renderField({
          name: 'insuranceType',
          label: 'Insurance Type',
          placeholder: 'Please Choose Insurance Type',
          dataSet: this.props.insuranceTypes,
          validate: [required]
        }, PickerField)}
        <View style={styles.btnWrapper}>
          <Button
            title='Done'
            icon={{name: 'check', size: 28}}
            onPress={this.submitData}
            backgroundColor={Colors.primaryBlue}
            borderRadius={5}
            fontSize={20}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    insuranceTypes: pathOr([], ['insurance', 'payload'], state),
    submitSucceeded: pathOr(false, ['form', formName, 'submitSucceeded'], state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    validateForm: () => dispatch(touch(formName))
  }
}

const enchance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: formName})
)
export default enchance(AddInsuranceForm)
