import { StackNavigator } from 'react-navigation'
import AddNewInsuranceScreen from '../Containers/AddNewInsuranceScreen'
import HomeScreen from '../Containers/HomeScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AddNewInsuranceScreen: { screen: AddNewInsuranceScreen },
  HomeScreen: { screen: HomeScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  // initialRouteName: 'AddNewInsuranceScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
