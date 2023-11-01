import React from 'react'
import { Text, View } from 'react-native'

const ViewMatchList = ({name,city,date,time,ground,over,perbowler,status}) => {
  return (

        <View style={{borderWidth:1,borderRadius:10,marginHorizontal:10,marginTop:20}}>
            <Text style={{fontSize:25,fontWeight:'bold',marginTop:10,marginLeft:10}}>{name}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>City -: {city}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Date -: {date}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Time -: {time}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Ground -: {ground}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Over -: {over}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginLeft:10}}>Per Bowler -: {perbowler}</Text>
            <View style={{borderWidth:1,borderRadius:10,marginVertical:20,marginHorizontal:10}}>
                <Text style={{fontSize:25,fontWeight:"bold",marginHorizontal:10,marginVertical:10}}>{status}</Text>
            </View>
        </View>

  )
}

export default ViewMatchList