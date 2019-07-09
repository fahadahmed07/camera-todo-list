import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
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

  async capture() {
    const { imageList } = this.state;
    const photo = await this.camera.takePictureAsync();
    imageList.push(photo)
    console.log("imageList ==> ", imageList)
    this.setState({
      imageList: imageList,
      showCamera: false,
    })
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
          <Camera ref={ref => { this.camera = ref }} style={{ flex: 1 }} type={this.state.type}>
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
                <Ionicons name="md-reverse-camera" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                  marginBottom: 10,
                  marginRight: 10,
                }}
                onPress={() => this.capture()}>
                <Ionicons name="md-camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  _renderMainList() {
    const { imageList, } = this.state;
    console.log("render imageList ==> ", imageList)

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
            data={imageList}
            renderItem={this._renderImageList}
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

  _renderImageList({ item }) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: 100, height: 100, margin: 5 }}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>{item.imageUri}</Text>
        </View>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </View>
    );
  }

  render() {
    const { showCamera } = this.state;
    // console.log(showCamera)
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