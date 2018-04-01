import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import UserAvatar from '../Components/Avatar'
import { Header, Button, List, ListItem } from 'react-native-elements'
import HeaderTitle from '../Components/HeaderTitle'
import { Colors } from '../Themes'
import { connect } from 'react-redux'
import { path, pathOr, memoizeWith, identity, prop, add, __, reduce, map, addIndex } from 'ramda'

// Styles
import styles from './Styles/HomeScreenStyles'

const mapIndexed = addIndex(map)

class HomeScreen extends Component {
  goToNewInsuranceScreen = () => this.props.navigation.navigate('AddNewInsuranceScreen')

  renderListItem = (data, index) => {
    // insuranceName: "Hgvvgg", yearlyPremium: 234, insuranceType: "Health insurance"
    return (
      <ListItem
        key={data.id}
        title={data.insuranceName}
        rightTitle={`$${data.yearlyPremium.toFixed(2)}`}
        rightIcon={{
          name: 'delete',
          color: Colors.error
        }}
      />
    )
  }

  render () {
    const { isFetching } = this.props
    const btnIcon = isFetching ? null : {name: 'check', size: 28}
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Header
            placement="left"
            leftComponent={<UserAvatar />}
            centerComponent={<HeaderTitle title="Hello John!" />}
          />
          <View style={styles.row}>
            <View style={styles.leftScreenBlock}>
              <Text style={styles.insuranceLabel}>
                Total Insurance:
              </Text>
              <Text style={styles.insurancePrice}>
                {this.props.insuranceSum}
              </Text>
            </View>
            <View style={styles.rightScreenBlock}>
              <Button
                title='Add New Insurance'
                icon={btnIcon}
                backgroundColor={Colors.primaryBlue}
                borderRadius={5}
                loading={isFetching}
                disabled={isFetching}
                onPress={this.goToNewInsuranceScreen}
              />
            </View>
          </View>
          <List>
            {mapIndexed(this.renderListItem, this.props.insuranceList)}
          </List>
        </ScrollView>
      </View>
    )
  }
}

const sumPrice = (acc, x) => add(acc, prop('yearlyPremium', x))
const memoizeSum = memoizeWith(identity, insuranceList => {
  const sum = reduce(sumPrice, 0, insuranceList)
  return `$${sum.toFixed(2)}`
})

const mapStateToProps = state => {
  const currentIndex = path(['nav', 'index'], state)
  const insuranceList = pathOr([], ['insurance', 'data'], state)
  const insuranceSum = memoizeSum(insuranceList)
  return {
    insuranceList,
    insuranceSum,
    isFetching: path(['insurance', 'fetching'], state)
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
