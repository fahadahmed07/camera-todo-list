import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      imageList: [],
      showCamera: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _renderCamera() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom: 10,
                  marginLeft: 10,
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name="md-reverse-camera" size={40} color="white" />
                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                  marginBottom: 10,
                  marginRight: 10,
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name="md-camera" size={40} color="white" />
                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  _renderMainList() {
    const { imageList, } = this.state;
    console.log(imageList)
    return (

      <View style={styles.container}>
        <Text
          style={{
            width: '100%',
            marginBottom: 10,
            paddingTop: 40,
            paddingBottom: 30,
            backgroundColor: 'green',
            textAlign: 'center',
            fontSize: 24,
            color: 'white',
          }}>
          Camera Todo App
        </Text>
        {imageList.length ?
          <FlatList
            data={[{ key: 'a' }, { key: 'b' }]}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          /> :
          <Text>You don't have any image.</Text>
        }
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginBottom: 20,
            marginRight: 10,
          }}
          onPress={() => {
            this.setState({
              showCamera: true,
            });
          }}>
          <Ionicons name="md-add-circle-outline" size={50} color="green" />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { showCamera } = this.state;
    console.log(showCamera)
    return (
      <View style={{ flex: 1 }}>
        {showCamera ? this._renderCamera() : this._renderMainList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});