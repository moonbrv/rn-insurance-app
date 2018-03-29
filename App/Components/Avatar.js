import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/AvatarStyle'
import { Avatar } from 'react-native-elements'
import { Images } from '../Themes'

const UserAvatar = props => {
  return (
    <View style={styles.container}>
      <Avatar
        medium
        rounded
        source={Images.avatarPlaceholder}
      />
    </View>
  )
}

export default UserAvatar
