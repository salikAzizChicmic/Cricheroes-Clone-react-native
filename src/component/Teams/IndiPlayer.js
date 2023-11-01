import React from 'react'
import { Text, TextInput, View,TouchableOpacity, Alert, ScrollView } from 'react-native'
const IndiPlayer = (props) => {
  return (
    <TouchableOpacity style={{borderWidth:1,borderColor:props.selected?'green':'grey',marginTop:10,borderRadius:10}}  key={props.ind} >
                <Text style={{fontSize:20,fontWeight:'bold',color:props.selected?'green':'grey',marginHorizontal:10,marginVertical:5}} >{props.name}</Text>
    </TouchableOpacity>
  )
}

export default IndiPlayer