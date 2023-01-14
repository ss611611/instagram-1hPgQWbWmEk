import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Add({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  useEffect(() => {
    (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');

        const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
        
    })();
  }, []);

  const takePicturn = async () => {
    if(camera) {
        const data = await camera.takePicturnAsync(null);
        setImage(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypesOptions.Images,
      allowsEditing: true,
      aspect:[1, 1],
      Quality:1 ,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || galleryStatus === false) {
    return <Viwe />;
  }
  if (hasPermission === false || galleryStatus === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex: 1 }}>
        <View style={styles.CameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type} 
            ratio={'1:1'} />
        </View>
        <Button 
        style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        }}
        title="Flip Image"
        onPress={() => {
            setType(
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
            );
        }}>           
        </Button>
        <Button title="Take Picturn" onPress={() => takePicturn()}  />
        <Button title="Pick Image From Gallery" onPress={() => pickImage()}  />
        <Button title="Save" onPress={() => navigation.navigate('Save', {image})}  />       
        {image && <Image source={{uri: image}} style={{flex: 1}} />}
    </View>
  );
}

const styles = StyleSheet.create({
    CameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})