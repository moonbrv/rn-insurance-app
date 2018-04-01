import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import UserAvatar from '../Components/Avatar'
import { Header, Button, List, ListItem } from 'react-native-elements'
import HeaderTitle from '../Components/HeaderTitle'
import { Colors } from '../Themes'
import { connect } from 'react-redux'
import { path, pathOr, memoizeWith, identity, prop, add, __, reduce, map, addIndex } from 'ramda'
import Modal from 'react-native-modal'
import InsuranceActions from '../Redux/InsuranceRedux'

// Styles
import styles from './Styles/HomeScreenStyles'

const INITIAL_STATE = {
  modalIsOpen: false,
  idOfInsuranceToDelete: null
}

class HomeScreen extends Component {
  state = INITIAL_STATE

  openModal = data => () => this.setState({
    modalIsOpen: true,
    insuranceToDelete: data
  })

  closeModal = () => this.setState(INITIAL_STATE)

  goToNewInsuranceScreen = () => this.props.navigation.navigate('AddNewInsuranceScreen')

  deleteItem = () => {
    const { insuranceToDelete } = this.state
    this.closeModal()
    if (insuranceToDelete) {
      this.props.deleteInsurance(insuranceToDelete)
    }
  }

  renderListItem = data=> {
    return (
      <ListItem
        key={data.id}
        title={data.insuranceName}
        rightTitle={`$${data.yearlyPremium.toFixed(2)}`}
        rightIcon={{
          name: 'delete',
          color: Colors.error
        }}
        onPressRightIcon={this.openModal(data)}
      />
    )
  }

  render () {
    const { isFetching } = this.props
    const btnIcon = isFetching ? null : {name: 'check', size: 28}
    return (
      <View style={styles.container}>
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
        <ScrollView style={styles.container}>
          <List>
            {map(this.renderListItem, this.props.insuranceList)}
          </List>
        </ScrollView>
        <Modal
          isVisible={this.state.modalIsOpen}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.centringBlock}>
              <Text style={styles.modalTitle}>Are you sure want to delete?</Text>
              <Text style={styles.modalTitle}>{ path(['insuranceToDelete', 'insuranceName'], this.state) }</Text>
            </View>
            <View style={styles.modalRow}>
              <View style={styles.halfScreen}>
                <Button
                  title='Cancel'
                  icon={{name: 'block', size: 28}}
                  backgroundColor={Colors.success}
                  borderRadius={5}
                  onPress={this.closeModal}
                />
              </View>
              <View style={styles.halfScreen}>
                <Button
                  title='Delete'
                  icon={{name: 'delete', size: 28}}
                  backgroundColor={Colors.error}
                  borderRadius={5}
                  onPress={this.deleteItem}
                />
              </View>
            </View>
          </View>
        </Modal>
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
    deleteInsurance: data => dispatch(InsuranceActions.deleteInsurance(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
