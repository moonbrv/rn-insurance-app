import { getInsurance, transformTypesResponse } from '../App/Sagas/InsuranceSagas'
import { put } from 'redux-saga/effects'
import InsuranceActions, { dummyData } from '../App/Redux/InsuranceRedux'
import { cloneableGenerator } from 'redux-saga/utils'

const successMockResponse = {
  ok: true,
  status: 200,
  data: {
    query: {
      categorymembers: [
        { title: 'Hodor: Title Text 1', pageid: 134234},
        { title: 'Hodor: Title Text 2', pageid: 164235},
        { title: 'Hodor: Title Text 3', pageid: 134737}
      ]
    }
  }
}

const falseMockResponse = {
  ...successMockResponse,
  ok: false,
  status: 400
}

const mockApi = { getInsurances: () => { Promise.resolve() } }
const stepper = (fn) => (mock) => fn.next(mock).value

test('success path', () => {
  const action = InsuranceActions.insuranceRequest()
  const step = stepper(getInsurance(mockApi, action))
  expect(step()).toEqual(put(InsuranceActions.insuranceRequestStart()))
  step()
  expect(step(successMockResponse)).toEqual(put(InsuranceActions.insuranceSuccess(transformTypesResponse(successMockResponse))))
})

test('failture path', () => {
  const action = InsuranceActions.insuranceRequest()
  const step = stepper(getInsurance(mockApi, action))
  expect(step()).toEqual(put(InsuranceActions.insuranceRequestStart()))
  step()
  expect(step(falseMockResponse)).toEqual(put(InsuranceActions.insuranceFailure()))
})
