import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import RenderedTeam from './RenderedTeam';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

var ct=0
const CreateTeams = () => {
    const navigation=useNavigation();
    const[allTeam,setAllTeam]=useState([])
    const[allPlayer,setAllPlayer]=useState([])
    const getData=()=>{
        console.log("get Data")
        const path='/user/'+auth().currentUser.uid+"/teams"
    
        database()
        .ref(path)
        .once('value')
        .then(snapshot => {
            //console.log(snapshot.val())
            
            const tempArr=[]
            for(let x in snapshot.val()){
                tempArr.push({
                    name:x,
                    team:snapshot.val()[x]
                })
            }
            //console.log(tempArr)
            setAllTeam(tempArr)
        })
        .catch((err)=>{
            Alert.alert("Error")
        })
    }

    
    useEffect(()=>{
        getData()
        
    },[])
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={{width:'100%',height:'13%',backgroundColor:'white'}}>
        <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../../Assets/previous.png')} />
    </TouchableOpacity>
        <ScrollView>
            {allTeam && 
                <RenderedTeam key={ct++} team={allTeam} />
            }
        </ScrollView>
        <TouchableOpacity onPress={()=>{
            navigation.popToTop()
            navigation.navigate("AddTeams",{allTeam:allPlayer})
            }} style={{marginVertical:10}}>
            <Image style={{height:100,width:100}}  source={require('../../Assets/plus.png')}/>
        </TouchableOpacity>    
    </View>
  )
}

export default CreateTeams