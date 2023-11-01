import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { style } from './Style';

const Dashboard = () => {
  const navigation=useNavigation()
  const handleLogout=()=>{
    auth().signOut().then(()=>{
      navigation.popToTop()
      navigation.navigate("Login")
    })
  }

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
       <TouchableOpacity onPress={()=>navigation.navigate("RenderMatch")}  style={{backgroundColor:'#367545',marginVertical:200,borderRadius:10,width:"70%",marginHorizontal:70}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:105}} >Details</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Dashboard