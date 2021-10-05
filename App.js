import React from 'react';
import { ImagePickerIOS, StyleSheet, Text, View } from 'react-native';
import PickImage from './PickImage'
export default class App extends React.Component {
  render(){
    return (
     <PickImage/> 
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
