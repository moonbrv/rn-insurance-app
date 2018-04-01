import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  insuranceRequest: null,
  insuranceRequestStart: null,
  insuranceSuccess: ['payload'],
  insuranceFailure: null,
  addNewInsurance: ['data'],
  deleteInsurance: ['payload']
}, {
  prefix: '@insurance/'
})

export const InsuranceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const yearlyPremiumLens = R.lensProp('yearlyPremium')
const idLens = R.lensProp('id')
const transformNewInsurance = (data, id = uuidv1()) => R.compose(
  R.over(yearlyPremiumLens, Number),
  R.set(idLens, id)
)(data)

export const dummyData = [
  { insuranceName: 'Hands', yearlyPremium: 200.5, insuranceType: 'Health insurance', id: 'fsddf45-326-6fdf' },
  { insuranceName: 'Foots', yearlyPremium: 442, insuranceType: 'Health insurance', id: '454453gg-fgd' },
  { insuranceName: 'Arms', yearlyPremium: 234, insuranceType: 'Health insurance', id: 'fdfs45-34t5tgf' },
  { insuranceName: 'Head', yearlyPremium: 300, insuranceType: 'Health insurance', id: 'fsdsdfds-f36df' },
  { insuranceName: 'Back', yearlyPremium: 500.38, insuranceType: 'Health insurance', id: '4--54g452gfgd' },
  { insuranceName: 'Lungs', yearlyPremium: 700, insuranceType: 'Health insurance', id: 'fdfs134t5t-gf' }
]

export const INITIAL_STATE = Immutable({
  data: dummyData,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

export const deleteItem = (state, { payload }) => {
  const { id } = payload
  const deleteItemIndex = R.findIndex(R.propEq('id', id), state.data)
  if (deleteItemIndex >= 0) {
    const data = R.remove(deleteItemIndex, 1, state.data)
    return state.merge({ data })
  } else {
    return state
  }
}

export const updateUserInsurance = (state, { data }) => {
  const newInsurance = transformNewInsurance(data)
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
  [Types.ADD_NEW_INSURANCE]: updateUserInsurance,
  [Types.DELETE_INSURANCE]: deleteItem
})
