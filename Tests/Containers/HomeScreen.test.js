import 'react-native'
import React from 'react'
import HomeScreen from '../../App/Containers/HomeScreen'
// import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

test('Home screen renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
