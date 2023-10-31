import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Register from '../Register/Register';


const Login = () => {
    const[placeHolder,setPlaceholder]=useState("Email")
    const[passPlaceholder,setPassPlaceholder]=useState("Password")
    const[inpText,setInpText]=useState("")
    const[password,setPassword]=useState("")
    const navigation=useNavigation()

    const handleInput=(text)=>{
        setInpText(text.trim())
    }

    const handleInputPass=(text)=>{
        setPassword(text.trim())
    }

   
    const handleSubmit=()=>{
            console.log(inpText)
            
            handleFocusBlur()
            handleSignIn()
        
    }

    const handleSignIn=()=>{
        try {
            auth().signInWithEmailAndPassword(inpText, password).then((res)=>{
                console.log(res)
                navigation.navigate("Dashboard")
            }).catch((err)=>{
                console.log(err)
            })
          } catch (error) {
            console.log(error);
          }
    }
    const handleFocusBlur=()=>{
        if(inpText.trim().length==0){
            setPlaceholder("Email")
            
        }else{
            setPlaceholder("")
        }
    }

    const handleFocusBlur1=()=>{
        if(password.trim().length==0){
            setPassPlaceholder("Password")
        }else{
            setPassPlaceholder("")
        }
    }

    useEffect(()=>{
            if(auth().currentUser){
                console.log(auth().currentUser.uid)
                navigation.navigate("Dashboard")
            }
    })
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#252926',height:'100%',width:'100%'}}>
        <View style={{flexDirection:'column',borderWidth:3,height:'8%',minHeight:60,minWidth:'80%',borderColor:'#367545',borderRadius:10}} >
        <Text style={{color:'white',position:'absolute',fontSize:20,marginLeft:'4%',marginTop:"4%"}} >{placeHolder}</Text>
            <TextInput onChangeText={handleInput} style={{height:'100%',width:310,color:'white'}} onFocus={()=>setPlaceholder("")} onBlur={handleFocusBlur} />
        </View>
        <View style={{flexDirection:'column',borderWidth:3,height:'8%',minHeight:60,minWidth:'80%',borderColor:'#367545',borderRadius:10,marginTop:10}} >
        <Text style={{color:'white',position:'absolute',fontSize:20,marginLeft:'4%',marginTop:"4%"}} >{passPlaceholder}</Text>
            <TextInput onChangeText={handleInputPass} style={{height:'100%',width:310,color:'white'}} onFocus={()=>setPassPlaceholder("")} onBlur={handleFocusBlur1}/>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:135}} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
            <Text style={{color:'#367545',fontSize:20}}>New user?Register</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Login