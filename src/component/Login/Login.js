import React, { useState, useEffect, useRef } from 'react';
import { Button, TextInput, View,TouchableOpacity,Text, Image, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import { Style } from './Style';
import { style } from '../Dashboard/Style';



export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const navigation=useNavigation()
  

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
    if(auth().currentUser){
        
        navigation.navigate("Dashboard")
    }
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
        Alert.alert("Authentication success")
        navigation.navigate("Dashboard")
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
        <View style={Style.container}>
        <Text style={Style.headerText} >Login Here</Text>
        <View style={Style.ccode}>
             <TouchableOpacity
        onPress={() => setShow(true)}
        style={Style.opac}
      >
      <View style={Style.codecontainer}>
        <Text style={Style.codeText}>
           {countryCode}
        </Text>
        <Image style={Style.downImg} source={require('../../Assets/down.png')} />
        </View>
      </TouchableOpacity>

      <TextInput value={phoneNumber} onChangeText={(text)=>setPhoneNumber(""+text)} placeholder='Enter your phone number' keyboardType="numeric" style={Style.phoneText} />

      </View>
      {loading && <ActivityIndicator size={'large'} />}
     <TouchableOpacity    style={Style.countryPicker}>
     {show &&  <CountryPicker
     
        show={true}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />}

</TouchableOpacity>

     
      <TouchableOpacity onPress={() => signInWithPhoneNumber(countryCode+phoneNumber)} style={Style.RegisterBtn} >
            <Text style={Style.RegisterText} >Register with otp</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
            <Text>New User?Register Here</Text>
        </TouchableOpacity>
        </View>
      
    );
  }

  //database



  return (
    <View style={Style.bOX}>
      <View style={Style.subbox}>
        <TextInput autoFocus={true} value={one} onChangeText={text => {
            ref2.current.focus()
            setOne(""+text)
            }} 
            maxLength={1} keyboardType="numeric" style={Style.inp} />
        <TextInput ref={ref2} value={two} onChangeText={text => {
            ref3.current.focus()
            setTwo(""+text)
            }} maxLength={1} keyboardType="numeric" style={Style.inp} />
        <TextInput ref={ref3} value={three} onChangeText={text =>{
             ref4.current.focus()
             setThree(""+text)
             }} maxLength={1} keyboardType="numeric" style={Style.inp} />
        <TextInput ref={ref4} value={four} onChangeText={text =>{
            ref5.current.focus() 
            setFour(""+text)
            }} maxLength={1} keyboardType="numeric" style={Style.inp} />
        <TextInput ref={ref5} value={five} onChangeText={text =>{
            ref6.current.focus()
            setFive(""+text)
            }} maxLength={1} keyboardType="numeric" style={Style.inp} />
        <TextInput ref={ref6} value={six} onChangeText={text => setSix(""+text)} maxLength={1} keyboardType="numeric" style={Style.inp} />
      </View>

      <TouchableOpacity onPress={() => confirmCode()} style={Style.confirmContainer} >
            <Text style={Style.confirmText} >Confirm Code</Text>
        </TouchableOpacity>
    </View>
  );
}