import React, { Component } from 'react'
import { View, StatusBar, BackHandler, Platform } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { NavigationActions } from 'react-navigation'
import { path } from 'ramda'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentWillMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackButton)
  }

  componentDidMount () {
    this.props.startup()
  }

  onAndroidBackButton = () => {
    const { currentKey, navigationIndex, goBack } = this.props
    const shouldStayInApp = !!navigationIndex
    if (shouldStayInApp) {
      goBack(currentKey)
    }
    return shouldStayInApp
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const navigationIndex = path(['nav', 'index'], state)
  const currentKey = path(['nav', 'routes', navigationIndex, 'key'], state)
  return {
    navigationIndex,
    currentKey
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  goBack: key => dispatch(NavigationActions.back({ key }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
