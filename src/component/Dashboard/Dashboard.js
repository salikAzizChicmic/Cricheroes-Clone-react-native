import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { style } from './Style';
import UserPost from '../Post/UserPost';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';


const Dashboard = () => {
  const navigation=useNavigation()
  const [mapData,setMapData]=useState([]);
  const handleLogout=()=>{
    auth().signOut().then(()=>{
      navigation.popToTop()
      navigation.navigate("Login")
    })
  }

  const getAllPost=()=>{
    const path='/user'
  
      database()
      .ref(path)
      .once('value')
      .then(snapshot => {
        
         
         //x--> uid ,y --> post id
         let allPost=[];
         for(let x in snapshot.val()){
          var pid=x;
          
           for(let y in snapshot.val()[x].post){
              pid=y;
              allPost.push({
                uid:x,
                pid:y,
                des:snapshot.val()[x].post[y].des,
                img:snapshot.val()[x].post[y].image,
                name:snapshot.val()[x].post[y].name,
              })
              
           }
           
          
         }
         console.log(allPost)
          setMapData(allPost)
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  useEffect(()=>{
    getAllPost()
  },[])

  return (
    <View>
       <View style={style.box}>
          <Image style={style.logoImg} source={require('../../Assets/logo.png')} />
          <View style={style.container}>
            <Text style={style.proText} >GO PRO</Text>
          </View>
          <View style={style.imgContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate("CreateTeams")}>
              <Image style={style.icon} source={require('../../Assets/plus.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Match')} style={{marginHorizontal:20}}>
              <Image style={style.icon} source={require('../../Assets/cricket.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} >
              <Image style={style.icon} source={require('../../Assets/log-out.png')} />
            </TouchableOpacity>

          </View>
       </View>
       {/* //user post request */}
      <ScrollView style={{height:'84.5%'}}>
        {mapData.map((ele,ind)=>{
         return <UserPost uid={ele.uid} pid={ele.pid} name={ele.name} des={ele.des} image={ele.img} key={ind} />
        })}
      </ScrollView>  
        <View style={style.subbox}>
            <TouchableOpacity onPress={()=>navigation.navigate("RenderMatch")} >
              <Image style={style.subImg} source={require('../../Assets/detail.png')} />
              <Text style={style.subText}>{`Match\nDetails`}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate("CreatePost")} >
              <Image style={style.subImg} source={require('../../Assets/edit.png')} />
              <Text style={style.subText}>{`Create\nPost`}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={style.subImg} source={require('../../Assets/post.png')} />
              <Text style={style.subText}>{`My\nPosts`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Main")}>
              <Image style={style.subImg} source={require('../../Assets/notification.png')} />
              <Text style={style.subText}>{`Notify\nDetails`}</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Dashboard