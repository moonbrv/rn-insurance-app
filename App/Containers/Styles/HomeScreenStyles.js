import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

const row = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  modalContainer: {
    backgroundColor: Colors.snow,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5
  },
  row: {
    ...row,
    paddingTop: 20,
    paddingBottom: 20
  },
  modalTitle: {
    ...Fonts.style.h5,
    marginBottom: 10
  },
  modalRow: {
    ...row,
    justifyContent: 'center'
  },
  centringBlock: {
    alignItems: 'center'
  },
  halfScreen: {
    width: '50%'
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
