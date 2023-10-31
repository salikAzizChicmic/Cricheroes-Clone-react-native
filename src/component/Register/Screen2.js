import React, { useState, useEffect, useRef } from 'react';
import { Button, TextInput, View,TouchableOpacity,Text, Image, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';


export default function Screen2() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const navigation=useNavigation()
  const {name,age,email,password}=useRoute().params
  console.log("Name : "+name+",Age : "+age+",Email : "+email+",Password : "+password)

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [loading,setLoading] =useState(false)

  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [five, setFive] = useState('');
  const [six, setSix] = useState('');

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber,setPhoneNumber]=useState('')

  const ref2=useRef()
  const ref3=useRef()
  const ref4=useRef()
  const ref5=useRef()
  const ref6=useRef()

  //update data
  
  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setLoading(true)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
        setLoading(true)
      await confirm.confirm(one+two+three+four+five+six).then(()=>{
        setLoading(false)
        
         auth().signOut().then(()=>{
              Alert.alert("Authentication success")
                navigation.navigate("Login")
         })


        
        console.log("Success")
        
      })
      
    } catch (error) {
        setLoading(false)
        Alert.alert(error)
      console.log(error);
    }
  }

  if (!confirm) {
    return (
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
        <View style={{flexDirection:'row',marginVertical:10}}>
             <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            paddingHorizontal:10
        }}
      >
      <View style={{flexDirection:'row',borderWidth:1,borderColor:'grey',borderRadius:10}}>
        <Text style={{
            color: 'black',
            fontSize: 20,
            marginVertical:10,
            marginHorizontal:2
        }}>
           {countryCode}
        </Text>
        <Image style={{height:17,width:17,marginVertical:16,marginRight:2}} source={require('../../Assets/down.png')} />
        </View>
      </TouchableOpacity>

      <TextInput value={phoneNumber} onChangeText={(text)=>setPhoneNumber(""+text)} placeholder='Enter your phone number' keyboardType="numeric" style={{borderWidth:1,borderRadius:10,width:'75%',borderColor:'grey'}} />

      </View>
      {loading && <ActivityIndicator size={'large'} />}
     <TouchableOpacity    style={{backgroundColor:'red',height:'auto'}}>
     {show &&  <CountryPicker
     
        show={true}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />}

</TouchableOpacity>

     
      <TouchableOpacity onPress={() => signInWithPhoneNumber(countryCode+phoneNumber)} style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:108}} >Register with otp</Text>
        </TouchableOpacity>
        </View>
      
    );
  }

  //database



  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <View style={{flexDirection:'row',marginVertical:9,marginHorizontal:12}}>
        <TextInput autoFocus={true} value={one} onChangeText={text => {
            ref2.current.focus()
            setOne(""+text)
            }} 
            maxLength={1} keyboardType="numeric" style={{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5}} />
        <TextInput ref={ref2} value={two} onChangeText={text => {
            ref3.current.focus()
            setTwo(""+text)
            }} maxLength={1} keyboardType="numeric" style={{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5}} />
        <TextInput ref={ref3} value={three} onChangeText={text =>{
             ref4.current.focus()
             setThree(""+text)
             }} maxLength={1} keyboardType="numeric" style={{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5}} />
        <TextInput ref={ref4} value={four} onChangeText={text =>{
            ref5.current.focus() 
            setFour(""+text)
            }} maxLength={1} keyboardType="numeric" style={{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5}} />
        <TextInput ref={ref5} value={five} onChangeText={text =>{
            ref6.current.focus()
            setFive(""+text)
            }} maxLength={1} keyboardType="numeric" style={{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5}} />
        <TextInput ref={ref6} value={six} onChangeText={text => setSix(""+text)} maxLength={1} keyboardType="numeric" style={{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5}} />
      </View>

      <TouchableOpacity onPress={() => confirmCode()} style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:108}} >Confirm Code</Text>
        </TouchableOpacity>
    </View>
  );
}