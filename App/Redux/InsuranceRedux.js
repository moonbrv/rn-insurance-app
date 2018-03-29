import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  insuranceRequest: null,
  insuranceRequestStart: null,
  insuranceSuccess: ['payload'],
  insuranceFailure: null
}, {
  prefix: '@insurance/'
})

export const InsuranceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

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
  [Types.INSURANCE_FAILURE]: failure
})
