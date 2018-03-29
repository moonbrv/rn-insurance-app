import { takeLatest, all } from 'redux-saga/effects'
import api from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { InsuranceTypes } from '../Redux/InsuranceRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getInsurance } from './InsuranceSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(InsuranceTypes.INSURANCE_REQUEST, getInsurance, api)
  ])
}
