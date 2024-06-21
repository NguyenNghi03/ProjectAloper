import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import * as Notifications from 'expo-notifications';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import io from 'socket.io-client';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function Signature({ navigation }) {
  const [paths, setPaths] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const viewShotRef = useRef();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://172.20.10.2:3000'); // Replace with your server's IP and port
  
    socket.current.on('message', ({ title, body }) => {
      generateNotification(title, body);
    });
  
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);  

  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const newPath = `M${locationX},${locationY}`;
    setPaths([...paths, newPath]);
  };

  const handleTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const lastPath = paths[paths.length - 1];
    const updatedPath = `${lastPath} L${locationX},${locationY}`;
    const updatedPaths = [...paths.slice(0, -1), updatedPath];
    setPaths(updatedPaths);
  };

  const handleSave = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setImageUri(uri);
      showToast('Chữ ký đã được lưu thành công!');
  
      const documentUri = await saveToDocumentDirectory(uri);
      await saveToMediaLibrary(uri);
  
      socket.current.emit('sendMessage', {
        uri: documentUri,
        title: 'Chữ ký đã được lưu!',
        body: 'Bạn đã lưu thành công chữ ký của mình.',
      });
  
      await generateNotification('Chữ ký đã được lưu!', 'Bạn đã lưu thành công chữ ký của mình.', documentUri);
    } catch (error) {
      console.error('Failed to save signature:', error);
      Alert.alert('Error', 'Failed to save signature. Please try again.');
    }
  };
  

  const saveToDocumentDirectory = async (uri) => {
    try {
      const filename = uri.split('/').pop();
      const newUri = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.copyAsync({ from: uri, to: newUri });
      return newUri;
    } catch (error) {
      console.error('Failed to save image to document directory:', error);
      throw error;
    }
  };

  const saveToMediaLibrary = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission not granted to save to media library');
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync('AlperSignatures');

      if (album == null) {
        await MediaLibrary.createAlbumAsync('AlperSignatures', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
      }

      console.log('Image saved to media library');
    } catch (error) {
      console.error('Failed to save image to media library:', error);
      throw error;
    }
  };

  const generateNotification = async (title, body, imageUri = null) => {
    try {
      const attachments = [];
      if (imageUri) {
        const fileUri = FileSystem.documentDirectory + imageUri.split('/').pop();
        attachments.push({ uri: fileUri, type: 'image/png' });
      }
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          attachments,
        },
        trigger: null,
      });
      console.log('Notification scheduled successfully');
    } catch (error) {
      console.log('Error scheduling notification:', error);
      Alert.alert('Error', `Unable to schedule notification. Error: ${error.message}`);
    }
  };

  const showToast = (message) => {
    Toast.show({
      text1: message,
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleClear = () => {
    setPaths([]);
    setImageUri(null);
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ marginTop: 2, marginLeft: 2 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="return-down-back" size={32} color="black" />
        </Pressable>
      </View>
      <View
        style={{ borderWidth: 1, borderColor: 'black', margin: 10 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
          <Svg height="300px" width="100%" style={{ backgroundColor: 'white' }}>
            {paths.map((path, index) => (
              <Path key={index} d={path} stroke="black" strokeWidth={2} fill="none" />
            ))}
          </Svg>
        </ViewShot>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={handleClear}
          style={{
            alignItems: 'center',
            marginTop: 10,
            width: 100,
            height: 35,
            borderWidth: 1,
            justifyContent: 'center',
            backgroundColor: 'red',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Xóa chữ ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          style={{
            alignItems: 'center',
            marginTop: 10,
            marginLeft: 20,
            width: 100,
            height: 35,
            borderWidth: 1,
            justifyContent: 'center',
            backgroundColor: 'blue',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Lưu chữ ký</Text>
        </TouchableOpacity>
      </View>
      {imageUri && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>Chữ ký đã lưu:</Text>
          <Image source={{ uri: imageUri }} style={{ width: 370, height: 300, marginTop: 10 }} />
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}
