import React, { useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const UserPost = ({uid,pid,name,des,image}) => {
    const[likeStatus,setLikeStatus]=useState(false)
    const getLikeStatus=()=>{
        console.log("get Data")
        const path='/user/'+uid+"/post/"+pid+"/like/"+auth().currentUser.uid
    
        database()
        .ref(path)
        .once('value')
        .then(snapshot => {
            console.log(snapshot.val().like)
            setLikeStatus(snapshot.val().like)
        })
        .catch((err)=>{
            Alert.alert("Error")
        })
    }
    const changeLikeStatus=(val)=>{
        const path='/user/'+uid+"/post/"+pid+"/like/"+auth().currentUser.uid
        database()
        .ref(path)
        .set({
            like:val
        })
        .then(()=>{
            getLikeStatus()
            
            console.log("Like inserted")
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        getLikeStatus()
    },[])
  return (
    <View style={{backgroundColor:'white',height:'auto',width:"auto",borderRadius:10,marginHorizontal:10,marginTop:10}}>
        <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginHorizontal:10,marginTop:10}}>{name}</Text>
        <Text style={{marginHorizontal:10}}>{des}</Text>
        <Image style={{height:350,width:350,objectFit:'fill',marginHorizontal:10,marginVertical:10}} source={{uri:image}} />
        <View style={{flexDirection:'row',marginHorizontal:10,marginVertical:10}}>
       {!likeStatus &&<TouchableOpacity onPress={()=>changeLikeStatus(true)}>
            <Image style={{height:30,width:30}} source={require('../../Assets/heart.png')} />
        </TouchableOpacity> }
        {likeStatus&& <TouchableOpacity onPress={()=>changeLikeStatus(false)}>
            <Image style={{height:40,width:40}} source={require('../../Assets/redheart.png')} />
        </TouchableOpacity>}  
        <TouchableOpacity style={{marginLeft:26}}>
            <Image style={{height:30,width:30}} source={require('../../Assets/chat.png')} />
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default UserPost