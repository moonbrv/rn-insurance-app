import { call, put } from 'redux-saga/effects'
import InsuranceActions from '../Redux/InsuranceRedux'
import * as R from 'ramda'
// import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'

const titleProp = 'title'
const titleLens = R.lens(R.prop(titleProp), R.assoc(titleProp))

const getTitleName = R.compose(
  R.prop(1),
  R.split(':')
)

export const transformTypesResponse = R.compose(
  R.map(R.over(titleLens, getTitleName)),
  R.map(R.omit(['ns'])),
  R.pathOr([], ['data', 'query', 'categorymembers'])
)

export function * getInsurance (api, action) {
  yield put(InsuranceActions.insuranceRequestStart())
  const response = yield call(api.getInsurances)
  const categoryTypes = transformTypesResponse(response)
  if (response.ok) {
    yield put(InsuranceActions.insuranceSuccess(categoryTypes))
  } else {
    yield put(InsuranceActions.insuranceFailure())
    // Require snackbar only in prod because of bug in library
    // you may run it in app in dev mod, but test will not work
    if (!__DEV__) {
      const Snackbar = require('react-native-snackbar')
      Snackbar.show({
        title: 'An Error Occured!',
        duration: pathOr(3000, ['LENGTH_LONG'], Snackbar),
        backgroundColor: Colors.error
      })
    }
  }
}
