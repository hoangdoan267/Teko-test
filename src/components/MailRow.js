import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class MailRow extends Component {
  render() {
    let { item } = this.props
    return (
      <TouchableOpacity style={styles.touchArea}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.address}</Text>
          <Text style={{ color: '#b7b8b7' }}>{item.type}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  touchArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 20,
    paddingTop: 0,
    paddingRight: 20,
    marginBottom: 10
  }
})
