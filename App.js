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
    imageList.push(photo);
    console.log('imageList ==> ', imageList);
    this.setState({
      imageList: imageList,
      showCamera: false,
    });
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
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 20,
                  left: 20,
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
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 20,
                  right: 20,
                }}
                onPress={() => this.capture()}>
                <Ionicons name="md-camera" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 20,
                  left: 20,
                }}
                onPress={() => this.setState({ showCamera: false })}>
                <Ionicons name="md-arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  _renderMainList() {
    const { imageList } = this.state;
    console.log('render imageList ==> ', imageList);

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
        {imageList.length ? (
          <FlatList
            data={imageList}
            renderItem={this._renderImageList}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this._renderSeprator}
          />
        ) : (
            <Text style={{ marginLeft: 105, marginTop: 200, }}>You don't have any image.</Text>
          )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green',
            right: 20,
            bottom: 20,
            borderRadius: 30,
            elevation: 8,
          }}
          onPress={() => {
            this.setState({
              showCamera: true,
            });
          }}>
          <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderImageList({ item }) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: 100, height: 100, margin: 5 }}
        />
        <View style={{ flex: 7, justifyContent: 'center' }}>
          <Text>{item.uri.replace("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FCameraTodoList-65f24c03-5f91-48e3-b7b1-804c9099aca5/Camera/", "")}</Text>
        </View>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', }}>
          <Ionicons name="md-more" size={32} color="gray" />
        </TouchableOpacity>
      </View>
    );
  }

  _renderSeprator() {
    return (
      <View
        style={{ height: 1, width: '100%', backgroundColor: 'gray', }}>
      </View>
    )
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
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
});