import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Toss = () => {
  const {name,city,date,time,ground,over,perbowler,status,uid,matchid}=useRoute().params
  //console.log(uid)
  const navigation=useNavigation()
  const [myname,setMyname]=useState("")
  const[uri,setUri]=useState(0)
  const[batting,setBatting]=useState("");
  const[tossText,setTossText]=useState("Flip Coin!!!")
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)%2;
  }

  const handleCoinClick=()=>{
    let val=getRandomInt(100)
    console.log(val)
    if(val===1){
      setTossText("It's Tails!!!")
      setUri(1)
    }else{
      setTossText("It's Heads!!!")
      setUri(0)
    }
  }

  //selection logic
   const[won1,setWon1]=useState("blue")
   const[width1,setWidth1]=useState(0)
   const[won2,setWon2]=useState("blue")
   const[width2,setWidth2]=useState(0)
   const handlewon1=()=>{
      setWon1("green")
      setWidth1(2)
      setWidth2(0)
      setWon2("black")
   }
   const handlewon2=()=>{
      setWon1("black")
      setWon2("green")
      setWidth2(2)
      setWidth1(0)
   }

   //winner selection
   const[won11,setWon11]=useState("blue")
   const[width11,setWidth11]=useState(0)
   const[won22,setWon22]=useState("blue")
   const[width22,setWidth22]=useState(0)
   const handlewon11=()=>{
      setWon11("green")
      setWidth11(2)
      setWidth22(0)
      setWon22("black")
   }
   const handlewon22=()=>{
      setWon11("black")
      setWon22("green")
      setWidth22(2)
      setWidth11(0)
   }

  //selection logic
  //get my team
  const[myTeam,setMyTeam]=useState([])
  const getMyTeam=()=>{
    const path='/user/'+auth().currentUser.uid+"/teams"
      database()
      .ref(path)
      .once('value')
      .then(snapshot => {
         setMyTeam(snapshot.val())
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  //get opponents team
  const[oppTeam,setOppTeam]=useState([])
  const getOppTeam=()=>{
    const path='/user/'+uid+"/teams"
  
      database()
      .ref(path)
      .once('value')
      .then(snapshot => {
         setOppTeam(snapshot.val())
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  //getMy name
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
  useEffect(()=>{
    getMyname()
    getMyTeam()
    getOppTeam()
  },[])
  //getMy Name

  const handleSubmit=()=>{
    if(won1==='blue' || won2==='blue' || won11==='blue' || won22==='blue'){
      Alert.alert("Select all option")
      return;
    }
    //name,city,date,time,ground,over,perbowler,status,uid,matchid
    if((won1==='green' && won11==='green')||(won2==='green' && won22==='green')){
        console.log("My team batting")
        console.log("Opponent bowling")
        //data updation
        setBatting("home")
        //my side
        const p1="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score"
        database()
        .ref(p1)
        .update({
          result:2,
          batfirst:0,
          scoremyteam:0,
          scoreoppteam:0,
        })
        .then(() => {
          console.log('Data updated. my side batting opp bowling')
          //oppside
        const p2="/user/"+uid+"/match/"+matchid+"/score"
        database()
        .ref(p2)
        .update({
          result:2,
          batfirst:1,
          scoremyteam:0,
          scoreoppteam:0,
        })
        .then(() => {
          navigation.navigate("Main",{name:name,city:city,time:time,ground:ground,over:over,perbowler:perbowler,status:status,uid:uid,matchid:matchid,myTeam:myTeam,oppTeam:oppTeam,batting:batting})
          console.log('Data updated. his side batting me bowling')
        })
        .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))

        

        //data updation
    }else if((won1==='green' && won22==='green')|| (won2==='green' && won11==='green')){
       console.log('My team bowling')
       console.log('Opponent batting')
       setBatting("away")
       //my side
       const p1="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score"
        database()
        .ref(p1)
        .update({
          result:2,
          batfirst:1,
          scoremyteam:0,
          scoreoppteam:0,
        })
        .then(() => {
          console.log('Data updated. my side bowling opp batting')
           //oppside
         const p2="/user/"+uid+"/match/"+matchid+"/score"
         database()
         .ref(p2)
         .update({
           result:2,
           batfirst:0,
           scoremyteam:0,
           scoreoppteam:0,
         })
         .then(() => {
          navigation.navigate("Main",{name:name,city:city,time:time,ground:ground,over:over,perbowler:perbowler,status:status,uid:uid,matchid:matchid,myTeam:myTeam,oppTeam:oppTeam,batting:batting})
          console.log('Data updated. his side batting me bowling')
        })
         .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
    }
  }
  return (
    <View style={{flexDirection:'column'}}>
    <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginHorizontal:20,marginTop:10}}>Who won the toss?</Text>
      <View style={{flexDirection:'row',marginTop:20,alignContent:'space-between',marginHorizontal:30}}>
          <TouchableOpacity onPress={handlewon1} style={{backgroundColor:'white',width:150,marginRight:10,borderWidth:width1,borderColor:won1}}>
            <View style={{backgroundColor:'#33312c',borderRadius:180,width:100,marginVertical:10,marginHorizontal:25}}>
                <Text style={{color:'white',fontSize:30,fontWeight:'bold',textAlign:'center',marginVertical:29}}>{myname.slice(0,2).toUpperCase()}</Text>
            </View>
            <Text style={{textAlign:'center',marginBottom:20}}>{myname}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlewon2} style={{backgroundColor:'white',width:150,marginLeft:10,borderWidth:width2,borderColor:won2}}>
            <View style={{backgroundColor:'#33312c',borderRadius:180,width:100,marginVertical:10,marginHorizontal:25}}>
                <Text style={{color:'white',fontSize:30,fontWeight:'bold',textAlign:'center',marginVertical:29}}>{name.slice(0,2).toUpperCase()}</Text>
            </View>
            <Text style={{textAlign:'center',marginBottom:20}}>{name}</Text>
          </TouchableOpacity>
      </View>

      <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginHorizontal:20,marginTop:30}}>Winner of the toss elected to?</Text>
      <View style={{flexDirection:'row',marginTop:20,alignContent:'space-between',marginHorizontal:30}}>
          <TouchableOpacity onPress={handlewon11} style={{backgroundColor:'white',width:150,marginRight:10,borderWidth:width11,borderColor:won11}}>
            <View style={{backgroundColor:'#c2592d',borderRadius:180,width:100,marginVertical:10,marginHorizontal:25}}>
                <Image style={{height:50,width:40,marginVertical:25,marginHorizontal:30}} source={require('../../../Assets/bat.png')} />
            </View>
            <Text style={{textAlign:'center',marginBottom:20}}>Bat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlewon22} style={{backgroundColor:'white',width:150,marginLeft:10,borderWidth:width22,borderColor:won22}}>
            <View style={{backgroundColor:'#c2592d',borderRadius:180,width:100,marginVertical:10,marginHorizontal:25}}>
            <Image style={{height:60,width:40,marginVertical:20,marginHorizontal:30,objectFit:'contain'}} source={require('../../../Assets/bowl.png')} />
            </View>
            <Text style={{textAlign:'center',marginBottom:20}}>Bowl</Text>
          </TouchableOpacity>
      </View>
      <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginHorizontal:20,marginTop:30}}>{tossText}</Text>
      <TouchableOpacity onPress={handleCoinClick}>
        {uri===0 && <Image style={{marginTop:20,height:180,width:180,marginHorizontal:100}} source={require('../../../Assets/heads.jpeg')} />}
        {uri===1 && <Image style={{marginTop:20,height:180,width:180,marginHorizontal:100}} source={require('../../../Assets/tails.jpeg')} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:"#367545",marginTop:15}}>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'white',marginVertical:10}} >Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Toss