import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View,TouchableOpacity } from 'react-native'

const ViewMatchList = ({name,city,date,time,ground,over,perbowler,status,uid,matchid}) => {
  console.log(matchid)
  const navigation=useNavigation()
  const handleNavigate=()=>{
    navigation.navigate("Toss",{name:name,city:city,date:date,time:time,ground:ground,over:over,perbowler:perbowler,status:status,uid:uid,matchid:matchid})
  }
  return (

        <View style={{borderWidth:1,borderRadius:10,marginHorizontal:10,marginTop:20}}>
            <Text style={{fontSize:25,fontWeight:'bold',marginTop:10,marginLeft:10}}>{name}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>City -: {city}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Date -: {date}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Time -: {time}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Ground -: {ground}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Over -: {over}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Per Bowler -: {perbowler}</Text>
            <TouchableOpacity onPress={handleNavigate} style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10,marginHorizontal:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:80}} >Start Match</Text>
        </TouchableOpacity>
        </View>

  )
}

export default ViewMatchList