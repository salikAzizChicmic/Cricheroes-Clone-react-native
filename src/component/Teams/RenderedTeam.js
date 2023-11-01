import React, { useState } from 'react'
import { Text, View,TouchableOpacity, Modal } from 'react-native'

const RenderedTeam = ({team}) => {
    const[show,setShow]=useState(false)
    console.log(team)
  return (
    <View style={{backgroundColor:'white',borderRadius:10,marginTop:20}}>
    <Modal visible={show}>
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:50}}>
        {team.map((ele,ind)=>{
            return <Text key={ind} style={{fontSize:18,fontWeight:'bold'}}>{ele.team}</Text>
        })}
        
        <TouchableOpacity onPress={()=>setShow(false)} style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:135}} >Close</Text>
        </TouchableOpacity>
    </View>
        
    </Modal>
        <Text style={{width:250,textAlign:'center',marginVertical:10,fontSize:20,fontWeight:'bold'}}>My Team</Text>
        <TouchableOpacity onPress={()=>setShow(true)} style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10,marginHorizontal:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:80}} >View Teams</Text>
        </TouchableOpacity>
    </View>
  )
}

export default RenderedTeam