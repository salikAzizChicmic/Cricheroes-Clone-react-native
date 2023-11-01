import React, { useEffect, useState } from 'react'
import { Text,Alert,View,TouchableOpacity,Modal,Image } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Match = () => {
  const [show,setShow]=useState(false)
  const [data,setAllData]=useState([])
  const navigation=useNavigation()
  const [myname,setMyname]=useState("")
  const [pointer,setPointer]=useState("none")
  const getData=()=>{
    console.log("get Data")
    const path='/user'

    database()
    .ref(path)
    .once('value')
    .then(snapshot => {
       // console.log(snapshot.val())
        let tempArr=[];
        for(let x in snapshot.val()){
          if(snapshot.val()[x].teams && auth().currentUser.uid!=x){
            tempArr.push({
              uid:x,
              name:snapshot.val()[x].name,
              teams:snapshot.val()[x].teams
            })
          }
        }
        //console.log(tempArr)
        setAllData(tempArr)
    })
    .catch((err)=>{
        Alert.alert("Error")
    })
}

const getMyname=()=>{
  const path='/user/'+auth().currentUser.uid

    database()
    .ref(path)
    .once('value')
    .then(snapshot => {
       //console.log(snapshot.val().name)
        setMyname(snapshot.val().name.split(" ")[0]+"'s team")
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getMyteam=()=>{
  const path='/user/'+auth().currentUser.uid+"/teams"

    database()
    .ref(path)
    .once('value')
    .then(snapshot => {
       console.log(snapshot.val())
        if(snapshot.val()){
          setPointer("auto")
        }else{
          setPointer("none")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

useEffect(()=>{
  getData()
  getMyname()
  getMyteam()
},[])



  return (
    <>
    <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={{width:'100%',height:'7%',backgroundColor:'white'}}>
        <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:8}} source={require('../../Assets/previous.png')} />
    </TouchableOpacity>
    <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>Select Team</Text>
     {data.map((ele,ind)=>{
      return <View key={ind} style={{flexDirection:'column',borderWidth:1,borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:30,marginHorizontal:30}}>
      <Text style={{fontSize:20,fontWeight:'bold'}} >{ele.name.split(' ')[0]}'s Team</Text>
      <TouchableOpacity onPress={()=>setShow(true)} style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:90}} >Show Team</Text>
        </TouchableOpacity>
        <View pointerEvents={pointer}>

        
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate('CreateMatch',{name:ele.name,teams:ele.teams,uid:ele.uid,myname:myname})
        }}           
        style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:84}} >Create Match</Text>
        </TouchableOpacity>
        </View>
        <Modal visible={show}>
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:50}}>
        {ele.teams.map((ele,ind)=>{
          return <Text key={ind} style={{fontSize:18,fontWeight:'bold'}}>{ele}</Text>
        })}
           
        
        
        <TouchableOpacity onPress={()=>setShow(false)} style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:135}} >Close</Text>
        </TouchableOpacity>
    </View>
    </Modal>
    </View>
     })  }
     </>
  )
}

export default Match