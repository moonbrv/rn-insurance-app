import { put } from 'redux-saga/effects'
import InsuranceActions from '../Redux/InsuranceRedux'

export function * startup (action) {
  yield put(InsuranceActions.insuranceRequest())
}
