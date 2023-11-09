import React from 'react'
import { Text,View } from 'react-native'

const CommentList = ({name,comment,date}) => {
  return (
    <View style={{borderWidth:0.2,borderColor:'lightgrey',marginTop:10,marginHorizontal:20,borderRadius:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'black',marginTop:10,marginHorizontal:10}}>{name}</Text>
            <Text style={{marginTop:13,marginHorizontal:20}}>{date}</Text>
        </View>
        <Text style={{marginHorizontal:10,marginBottom:10}} >{comment}</Text>
    </View>
  )
}

export default CommentList