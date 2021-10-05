import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default class PickImage extends React.Component{
    constructor(){
        super()
        this.state={
            image:null,
            
        }
    }
    pickImage= async()=>{
        try{
            let result=await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1,
            })
            if(!result.cancelled){
                this.setState({
                image:result.data
            })
            this.uploadImage(result.uri)
        }
        }catch(E){
                console.log(E)
        }
    }

    getPermissions= async()=>{
        if(Platform.OS!=="web"){
            const {status}= await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status!=="granted"){
                alert('sorry! we need you to accept camera roll permissions ')
            }
        }
    }

    uploadImage= async(uri)=>{
        const data=new FormData()
        let fileName=uri.split('/')[uri.split('/').length-1]
        let type=`image/${uri.split('.')[uri.split('.').length-1]}`
        const filetoupload={
            uri:uri,
            name:fileName,
            type:type,
        }
        data.append("digit",filetoupload)
        fetch("https://3b44-2405-201-d008-4cfe-149f-91ff-b358-3b6f.ngrok.io/predict-digit",{
            method:'POST',
            body:data,
            headers:{
                "content-type":"multipart/form-data"
            }
        })
        .then(
            (response)=>response.json()
        )
        .then((result)=>{
            console.log("Success: ",result)
        })
        .catch((error)=>{
            console.error("ERRor: ",error)
        })
    }
    componentDidMount(){
        this.getPermissions()
    }
    render(){
        let {image}=this.state
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity style={{backgroundColor:'red'}} onPress={this.pickImage}>
                    <Text>Pick Files</Text>
                </TouchableOpacity>
            </View>
        );
    }
}