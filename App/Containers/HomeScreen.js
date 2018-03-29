import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import UserAvatar from '../Components/Avatar'
import { Header, Button } from 'react-native-elements'
import HeaderTitle from '../Components/HeaderTitle'

// Styles
import styles from './Styles/HomeScreenStyles'

export default class HomeScreen extends Component {
  goToNewInsuranceScreen = () => this.props.navigation.navigate('AddNewInsuranceScreen')
  render () {
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={<UserAvatar />}
          centerComponent={<HeaderTitle title="Hello John!" />}
        />
        <Button
          title='BUTTON'
          onPress={this.goToNewInsuranceScreen}
        />
      </View>
    )
  }
}
