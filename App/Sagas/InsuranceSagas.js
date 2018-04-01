import { call, put } from 'redux-saga/effects'
import InsuranceActions from '../Redux/InsuranceRedux'
import * as R from 'ramda'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'

const titleProp = 'title'
const titleLens = R.lens(R.prop(titleProp), R.assoc(titleProp))

const getTitleName = R.compose(
  R.prop(1),
  R.split(':')
)

const transformTypesResponse = R.compose(
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
    Snackbar.show({
      title: 'An Error Occured!',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: Colors.error
    })
  }
}
