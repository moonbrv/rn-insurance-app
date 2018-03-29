import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    height: Metrics.headerHeight,
    width: Metrics.icons.large,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
