import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  leftScreenBlock: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15
  },
  rightScreenBlock: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  insuranceLabel: {
    color: Colors.banner,
    ...Fonts.style.normal
  },
  insurancePrice: {
    color: Colors.success,
    ...Fonts.style.normal
  }
})
