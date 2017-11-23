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

export default class TelephoneRow extends Component {
  render() {
    let { item } = this.props
    return (
      <TouchableOpacity style={styles.touchArea}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.number}</Text>
          <Text style={{ color: '#b7b8b7' }}>{item.type}</Text>
        </View>
        <Ionicons
          name="md-text"
          size={30}
          color="#8a8b8a"
          style={{ backgroundColor: 'transparent', right: 20 }}
        />
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
