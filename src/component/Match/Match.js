import React, { useEffect, useState } from 'react'
import { Text,Alert,View,TouchableOpacity,Modal,Image } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { style } from './style';


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
    <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={style.mBox}>
        <Image style={style.mprev} source={require('../../Assets/previous.png')} />
    </TouchableOpacity>
    <Text style={style.mheader}>Select Team</Text>
     {data.map((ele,ind)=>{
      return <View key={ind} style={style.mSubBox}>
      <Text style={style.mteamText} >{ele.name.split(' ')[0]}'s Team</Text>
      <TouchableOpacity onPress={()=>setShow(true)} style={style.mShow} >
            <Text style={style.mBtnText} >Show Team</Text>
        </TouchableOpacity>
        <View pointerEvents={pointer}>

        
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate('CreateMatch',{name:ele.name,teams:ele.teams,uid:ele.uid,myname:myname})
        }}           
        style={style.mShow} >
            <Text style={style.mmBtnText} >Create Match</Text>
        </TouchableOpacity>
        </View>
        <Modal visible={show}>
    <View style={style.modalDesign}>
        {ele.teams.map((ele,ind)=>{
          return <Text key={ind} style={style.team}>{ele}</Text>
        })}
           
        
        
        <TouchableOpacity onPress={()=>setShow(false)} style={style.mbtn} >
            <Text style={style.modalBtnText} >Close</Text>
        </TouchableOpacity>
    </View>
    </Modal>
    </View>
     })  }
     </>
  )
}

export default Match