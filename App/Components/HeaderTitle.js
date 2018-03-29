import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/HeaderTitleStyle'

const HeaderTitle = props => (
  <View style={styles.centerHeader}>
    <Text style={styles.headerText}>{props.title}</Text>
  </View>
)

export default HeaderTitle
