import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CommentList from './CommentList'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';

const Comment = () => {
  const [myName,setMyname]=useState("")
  const [commentText,setCommentText]=useState("")
  const [allComment,setAllComment]=useState([])
  const{uid,pid,name,des,image}=useRoute().params
  const navigation=useNavigation()

  const getAllComment=()=>{
    const path='/user/'+uid+"/post/"+pid+"/comment"

    database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      let temp=[]
      for(let x in snapshot.val()){
        console.log(snapshot.val()[x].comment)
        const dates=new Date(parseInt(x))
        const obj={
          name:snapshot.val()[x].name,
          comment:snapshot.val()[x].comment,
          date:`${dates.getDay()}-${(dates.getMonth()+1)}-${dates.getFullYear()}`,
          mili:parseInt(x)
        }
        temp.push(obj)
        
      }
      temp.sort(function(a, b){return b.mili - a.mili});
      setAllComment(temp)
      
      console.log(temp)
    })
    .catch((err)=>{
      console.log(err)
    })
  }  
  const getMyname=()=>{
    const path="/user/"+auth().currentUser.uid
    database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      setMyname(snapshot.val().name)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    getMyname()
  },[])

  useEffect(()=>{
    getAllComment()
  },[allComment])
  const postComment=()=>{
    const mili=new Date().getTime()
    const path='/user/'+uid+"/post/"+pid+"/comment/"+mili
    let temp=commentText
    setCommentText("")
    database()
    .ref(path)
    .update({
      name:myName,
      uid:auth().currentUser.uid,
      comment:temp
    }).then(()=>{

      console.log("comment inserted")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const handleCommentSend=()=>{
    postComment()
  }
  const[dotModal,setDotModal]=useState(false)
  const handleDots=()=>{
    setDotModal(true)
    Alert.alert(`Handle dots`)
  }
  return (
    <View>
        <Modal visible={dotModal} transparent={false}>
       <View style={{flexDirection:'row',height:300}}>
            <TouchableOpacity style={{height:"20%",width:100,backgroundColor:"white"}}>

            </TouchableOpacity>
            <TouchableOpacity style={{height:"20%",width:200,backgroundColor:"green"}}>

            </TouchableOpacity>
            </View>
        </Modal>
        <View style={{widt:'100%',height:60,backgroundColor:'white',flexDirection:"row",justifyContent:'space-between'}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")}>
            <Image style={{height:33,width:33,marginVertical:10,marginHorizontal:10}} source={require('../../Assets/previous.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDots}>
            <Image style={{height:30,width:30,marginVertical:12}} source={require('../../Assets/dots.png')} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginTop:'5%',backgroundColor:'white',width:'90%',height:60,marginHorizontal:18,borderRadius:10}}>
          <TextInput value={commentText} onChangeText={(text)=>setCommentText(text)} style={{width:'88%'}} placeholder='Send messages privately' />
          <TouchableOpacity onPress={handleCommentSend}>
            <Image style={{height:30,width:30,marginVertical:15,objectFit:"fill"}} source={require('../../Assets/send.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{height:700}}>
          {allComment.map((ele,ind)=>{
            return <CommentList key={ind} name={ele.name} comment={ele.comment} date={ele.date} />
          })}
        </ScrollView>
    </View>
  )
}

export default Comment