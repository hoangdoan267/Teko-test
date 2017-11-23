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
import MailRow from './MailRow'
import TelephoneRow from './TelephoneRow'
class ContactGroup extends Component {
  state = {}

  renderTelephone = () => {
    let { tel } = this.props.data
    return tel.map((item, index) => {
      return <TelephoneRow key={index} item={item} />
    })
  }

  renderMail = () => {
    let { email } = this.props.data
    return email.map((item, index) => {
      return <MailRow key={index} item={item} />
    })
  }

  render() {
    let { data } = this.props
    return (
      <View style={{ flex: 6, width: '100%' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contactGroup}>
            <Ionicons
              name="md-call"
              size={30}
              color="#03c89e"
              style={{ backgroundColor: 'transparent', flex: 1 }}
            />
            <View
              style={[
                styles.contactDetailGroup,
                { borderBottomWidth: 1, borderBottomColor: '#e9e9e9' }
              ]}
            >
              {this.renderTelephone()}
            </View>
          </View>
          <View style={styles.contactGroup}>
            <Ionicons
              name="md-mail"
              size={30}
              color="#03c89e"
              style={{ backgroundColor: 'transparent', flex: 1 }}
            />
            <View style={[styles.contactDetailGroup]}>{this.renderMail()}</View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  contactGroup: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingLeft: 30,
    paddingTop: 30
  },
  contactDetailGroup: {
    flexDirection: 'column',
    marginLeft: 20,
    flex: 9
  }
})
export default ContactGroup
