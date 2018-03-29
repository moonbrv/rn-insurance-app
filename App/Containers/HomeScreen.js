import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import UserAvatar from '../Components/Avatar'
import { Header } from 'react-native-elements'

// Styles
import styles from './Styles/HomeScreenStyles'

export default class HomeScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Header
          placement="left"
          leftComponent={<UserAvatar/>}
          centerComponent={<Text>Hello John</Text>}
        />
      </View>
    )
  }
}
