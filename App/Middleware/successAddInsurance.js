import { InsuranceTypes } from '../Redux/InsuranceRedux'
import { NavigationActions } from 'react-navigation'
import { path } from 'ramda'

const successAddInsurance = store => next => action =>{
  if (action.type === InsuranceTypes.ADD_NEW_INSURANCE) {
    const state = store.getState()
    const currentIndex = path(['nav', 'index'], state)
    const currentKey = path(['nav', 'routes', currentIndex, 'key'], state)
    store.dispatch(NavigationActions.back({ key: currentKey }))
  }
  return next(action)
}

export default successAddInsurance
