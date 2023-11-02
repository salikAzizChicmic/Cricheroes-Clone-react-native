import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View,TouchableOpacity,Image, TextInput ,Alert, Platform} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const CreatePost = () => {
    const navigation=useNavigation()
    const[des,setDes]=useState("")
    const[imgUri,setImgUri]=useState("")
    const[imgPath,setImgPath]=useState("")
    const[myname,setMyname]=useState("")

    //getMyname
    const getMyname=()=>{
      const path='/user/'+auth().currentUser.uid
    
        database()
        .ref(path)
        .once('value')
        .then(snapshot => {
           //console.log(snapshot.val().name)
            setMyname(snapshot.val().name)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    //push in database
    const pushData=(url)=>{
        const mili=new Date().getTime()
        const path='/user/'+auth().currentUser.uid+"/post/"+mili
        
        database()
        .ref(path)
        .set({
            name:myname,
            des:des,
            image:url,
            like:""
            
        })
        .then(() => {
            console.log('Data set.')
            Alert.alert("Post Uploaded")
              navigation.replace("Dashboard") 
            //insert Like
            
            //insert like
              
        })
        .catch((err)=>console.log(err))
    }

    //img upload
    const uploadImage = async () => {
        // console.log(url1.length,"jjjjjj")
        if(des.trim().length===0){
            Alert.alert("Please provide description")
        }
         if(imgUri.length<=10){
           Alert.alert(
               'Photo upload!',
               'Please Select Image',
            );
            return;
         }
         const filename = imgUri.substring(imgUri.lastIndexOf('/') + 1);
         const uploadUri = 
           Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
       
         const task = storage().ref(`/images/${filename}`).putFile(uploadUri);
         try {
           await task.then(async()=>{
            setImgUri("")
            const url = await storage().ref('images/'+filename).getDownloadURL()
            pushData(url)
           });
         } catch (e) {
           console.error(e);
         }
       };
    //img upload

    const handleImageSelect=()=>{
        console.log("Image select")
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
          };
          launchImageLibrary(options, response => {
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            console.log(response.assets[0].uri)
            setImgPath(response)
            setImgUri(response.assets[0].uri)
            
          });
    }

    useEffect(()=>{
      getMyname();
    },[])
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={{width:'100%',height:60,backgroundColor:'white'}}>
            <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../../Assets/previous.png')} />
        </TouchableOpacity>
        <Text style={{fontSize:25,fontWeight:"bold",marginTop:20}} >Create Post</Text>
        <TextInput onChangeText={(text)=>setDes(text.trim())} style={{borderWidth:1,borderRadius:10,marginTop:10,width:"65%"}} placeholder='Description' />
        {imgUri.length>0 &&
            <Image style={{height:200,width:200,objectFit:'fill',marginTop:10,borderRadius:10}} source={{uri:imgUri}} />
        }
        <TouchableOpacity onPress={handleImageSelect} style={{marginTop:10}}>
            <View style={{flexDirection:'row',borderWidth:1,borderRadius:10 }}>
                <Image style={{height:30,width:30,marginHorizontal:10,marginVertical:5}} source={require('../../Assets/attachment.png')} />
                <Text style={{fontSize:15,fontWeight:"bold",marginVertical:8,marginRight:5}}>Attach Image</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage} style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:108}} >Add Post</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CreatePost