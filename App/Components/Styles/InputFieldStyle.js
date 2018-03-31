import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  errorBlock: {
    height: 20
  },
  errorMsgWrapper: {
    position: 'absolute',
    left: 0,
    bottom: -10
  },
  labelError: {
    color: Colors.error
  }
})
