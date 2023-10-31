import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Screen1 = () => {
    const[placeHolder,setPlaceholder]=useState("Age")
    const[inpText,setInpText]=useState("")
    const navigation=useNavigation()
    const {name}=useRoute().params

    const handleInput=(text)=>{
        setInpText(text.trim())
    }

    const handleSubmit=()=>{
            console.log(inpText)
            let temp=inpText
            setInpText("")
            navigation.navigate("Screen0",{name:name,age:""+temp})
        
    }
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#252926',height:'100%',width:'100%'}}>
        <View style={{flexDirection:'column',borderWidth:3,height:'8%',minHeight:60,minWidth:'80%',borderColor:'#367545',borderRadius:10}} >
        <Text style={{color:'white',position:'absolute',fontSize:20,marginLeft:'4%',marginTop:"4%"}} >{placeHolder}</Text>
            <TextInput keyboardType="numeric" onChangeText={handleInput} style={{height:'100%',width:310,color:'white'}} onFocus={()=>setPlaceholder("")} onBlur={()=>setPlaceholder("Age")} />
            
        </View>
        
        <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:135}} >Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Screen1