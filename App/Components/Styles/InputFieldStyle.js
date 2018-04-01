import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5
  },
  errorMsgWrapper: {
    position: 'absolute',
    left: 0,
    bottom: -8
  },
  labelError: {
    color: Colors.error
  }
})
