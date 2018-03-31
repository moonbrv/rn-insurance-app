import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HeaderTitle from '../Components/HeaderTitle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../Themes'
import AddInsuranceForm from '../Components/AddInsuranceForm'

// Styles
import styles from './Styles/AddNewInsuranceScreenStyle'

const BackButton = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.buttonContainer}>
      <Icon
        name='arrow-back'
        size={32}
        color={Colors.frost}
      />
    </View>
  </TouchableWithoutFeedback>
)

class AddNewInsuranceScreen extends Component {
  // goBack = () => this.props.navigation.goBack()

  addInsurance = (values) => {
    console.log(values)
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Header
            placement="left"
            leftComponent={<BackButton onPress={this.props.navigation.goBack} />}
            centerComponent={<HeaderTitle title="Add new insurance" />}
          />
          <AddInsuranceForm
            onSubmit={this.addInsurance}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewInsuranceScreen)
