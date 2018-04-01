import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as R from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  insuranceRequest: null,
  insuranceRequestStart: null,
  insuranceSuccess: ['payload'],
  insuranceFailure: null,
  addNewInsurance: ['data']
}, {
  prefix: '@insurance/'
})

export const InsuranceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const yearlyPremiumLens = R.lensProp('yearlyPremium')

const dummyData = [
  { insuranceName: 'Hgvvgg', yearlyPremium: 234, insuranceType: 'Health insurance' },
  { insuranceName: 'Hgvvgg', yearlyPremium: 442, insuranceType: 'Health insurance' },
  { insuranceName: 'Hgvvgg', yearlyPremium: 234, insuranceType: 'Health insurance' }
]

export const INITIAL_STATE = Immutable({
  data: dummyData,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

export const updateUserInsurance = (state, { data }) => {
  const newInsurance = R.over(yearlyPremiumLens, Number, data)
  return state.merge({ data: R.append(newInsurance, state.data) })
}

// request the data from an api start
export const requestStart = state =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INSURANCE_REQUEST_START]: requestStart,
  [Types.INSURANCE_SUCCESS]: success,
  [Types.INSURANCE_FAILURE]: failure,
  [Types.ADD_NEW_INSURANCE]: updateUserInsurance
})
