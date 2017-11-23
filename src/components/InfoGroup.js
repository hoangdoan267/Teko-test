import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class InfoGroup extends Component {
  state = {}
  render() {
    let { data } = this.props
    return (
      <ImageBackground
        style={{
          flex: 5,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative'
        }}
        source={{ uri: data.cover_url }}
        // blurRadius={10}
        resizeMode={'cover'}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }}
        />
        <Image
          source={{ uri: data.picture_url }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: '#03c89e'
          }}
        />
        <Text
          style={{
            fontSize: 18,
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontWeight: '600',
            marginTop: 10
          }}
        >
          {data.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 8,
            alignItems: 'center',
            marginBottom: 20
          }}
        >
          <Ionicons
            name="ios-pin"
            size={30}
            color="#ffffff"
            style={{ backgroundColor: 'transparent', marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 16,
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontWeight: '600'
            }}
          >
            {data.address}
          </Text>
        </View>
      </ImageBackground>
    )
  }
}

export default InfoGroup
