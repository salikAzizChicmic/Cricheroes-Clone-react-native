import React, { useEffect, useState } from 'react'
import { Text, TextInput, View,TouchableOpacity, Alert, ScrollView, Button, Image } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const AddTeam = () => {
   const[allTeam,setAllTeam]=useState([])

   const [curTeam,setCurrentTeam]=useState([])
   const[toggle,setToggle]=useState(true)
   const[total,setTotal]=useState(0);
    const navigation=useNavigation();

    const[index,setIndex]=useState(0);

    const pushData=(tempArr)=>{
        const path='/user/'+auth().currentUser.uid+"/teams"
    
        database()
        .ref(path)
        .set(tempArr)
        .then(()=>{
            console.log("Data success")
            navigation.navigate("CreateTeams")
        })
        .catch((err)=>{
            Alert.alert("Error")
        })
    }
    const handleSubmit=()=>{
        const selectedPlayer=curTeam.filter((ele)=>ele.selected===true)
        if(selectedPlayer.length==11){
            const tempPlayer={}
            for(let i=0;i<selectedPlayer.length;i++){
                tempPlayer[i]=selectedPlayer[i].name
            }
            console.log(tempPlayer)
            pushData(tempPlayer)
        }else{
            Alert.alert("Your team should contain only 11 players")
        }
        
    }
    const getData=()=>{
        console.log("get Data")
        const path='/user/mXTSz1GTWtgZpyIYYW2tSQ9M5X02/Player'
    
        database()
        .ref(path)
        .once('value')
        .then(snapshot => {
            //console.log(snapshot.val())
            
            const tempArr=[]
            for(let x in snapshot.val()){
                tempArr.push({
                    name:snapshot.val()[x],
                    selected:false
                })
            }
            //console.log(tempArr)
            setAllTeam(tempArr)
            setCurrentTeam(tempArr)

            
        })
        .catch((err)=>{
            Alert.alert("Error")
        })
    }
    const handelPlayer=(ind)=>{
        setIndex(ind)
        let tempPlayer=allTeam

        for(let i=0;i<tempPlayer.length;i++){
            if(i===ind){
                tempPlayer[i].selected=!tempPlayer[i].selected
            }
        }
        //console.log(tempPlayer)
        //setAllTeam(tempPlayer)
        setToggle(!toggle)
        setCurrentTeam(tempPlayer)
       // console.log(curTeam)
       setTotal(tempPlayer.filter((ele)=>ele.selected===true).length)
    }

   useEffect(()=>{
        getData()
   },[])
   useEffect(()=>{
        handelPlayer(index)
   },[])
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
    <TouchableOpacity onPress={()=>navigation.navigate("CreateTeams")} style={{width:'100%',height:'7%',backgroundColor:'white'}}>
        <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../../Assets/previous.png')} />
    </TouchableOpacity>
        <Text style={{fontSize:20,fontWeight:'bold',marginTop:40}} >Create Team({total})</Text>
        <ScrollView>
        {curTeam.map((ele,ind)=>{
           return <View pointerEvents={(total===11 && ele.selected===false)?"none":'auto'} key={ind} style={{flexDirection:'row'}}><TouchableOpacity onPress={()=>handelPlayer(ind,ele.name)} style={{borderWidth:1,borderColor:ele.selected?'green':'grey',marginTop:10,borderRadius:10}} key={ind} >
                <Text style={{fontSize:20,fontWeight:'bold',color:ele.selected?'green':'grey',marginHorizontal:10,marginVertical:5}} >{ele.name}</Text>
                
            </TouchableOpacity>
            </View>
        })
            
        }
        </ScrollView>
        <TouchableOpacity onPress={handleSubmit}  style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:135}} >ADD</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddTeam