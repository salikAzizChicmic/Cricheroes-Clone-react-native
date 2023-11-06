import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View,Text, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Match from './Match';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


const CreateMatch = () => {
    
    const {name,teams,uid,myname}=useRoute().params;
    const navigation=useNavigation()

    const [mili,setMili]=useState(0)
    const [mdate,setMdate]=useState("");
    const [mtime,setMtime]=useState("")

    //uuid
    const getUuids = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
    //Match type
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'T-20', value: 20},
        {label: 'Oneday', value: 50},
        {label: 'Test', value: 80},
    ]);
  
   //Match type

   //Per Bowler
   const [open1, setOpen1] = useState(false);
   const [value1, setValue1] = useState(null);
   const [items1, setItems1] = useState([
       {label: 'Four', value: 4},
       {label: 'Six', value: 6},
       {label: 'Ten', value: 10},
   ]);
   //console.log(value1)
   //Per Bowler

   //Ground
   const [open2, setOpen2] = useState(false);
   const [value2, setValue2] = useState(null);
   const [items2, setItems2] = useState([
       {label: 'Eden Gardens', value: "Eden Gardens"},
       {label: 'Ekana', value: "Ekana"},
       {label: 'PCA Mohali', value: "PCA Mohali"},
       {label: 'Wankhade', value: "Wankhade"},
       {label: 'Chepauk', value: "Chepauk"},
       {label: 'MCA Pune', value: "MCA Pune"},
   ]);
   //Ground

   //city
    const[city,setCity]=useState("")
   //city

   //Date Picker
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

   const showDatePicker = () => {
     setDatePickerVisibility(true);
     
   };
 
   const hideDatePicker = () => {
     setDatePickerVisibility(false);
   };
 
   const handleConfirm = (date) => {
     console.log(""+new Date(date).getHours()+"-"+new Date(date).getMinutes());
     setMtime(""+new Date(date).getHours()+":"+new Date(date).getMinutes())
     setMdate(""+new Date(date).getDate()+"-"+(new Date(date).getMonth()+1)+"-"+new Date(date).getFullYear())
     setMili(new Date(date).getTime())

     if(new Date(date).getTime()>new Date().getTime()){
        hideDatePicker();
     }else{
        hideDatePicker();
        showDatePicker()
     }
     
   };

   //Date Pick

   //handle Submit

   const handleSubmit=()=>{
    if(value===null || value1===null || value2===null || city.trim().length===0 || mili===0){
        Alert.alert("Fill All details")
        return;
    }
    const obj={
        matchtype:value,
        city:city,
        perbowler:value1,
        date:mili,
        ground:value2
    }
    console.log(obj)
    
    const uuid=getUuids()+getUuids()
    // save at sender end
    const path1='/user/'+auth().currentUser.uid+"/match/"+uuid
    
    database()
    .ref(path1)
    .set({
        name:name.split(" ")[0]+"'s team",
        against:uid,
        matchtype:value,
        city:city,
        perbowler:value1,
        date:mili,
        ground:value2
    })
    .then(() => {
        console.log('Data set at sender end')
        // save at receiver end

    const path2='/user/'+uid+"/match/"+uuid
    
    database()
    .ref(path2)
    .set({
        name:myname,
        against:auth().currentUser.uid,
        matchtype:value,
        city:city,
        perbowler:value1,
        date:mili,
        ground:value2
    })
    .then(() => {
        console.log('Data set at rec end')
        navigation.navigate("Dashboard")
                
    })
    .catch((err)=>console.log(err))
    //rec end
                
    })
    .catch((err)=>console.log(err))


    
   }
  
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity onPress={()=>navigation.navigate("Match")} style={{width:'100%',height:'8%',backgroundColor:'white'}}>
        <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../../Assets/previous.png')} />
    </TouchableOpacity>
        <Text style={{fontSize:25,fontWeight:'bold',color:'black',marginTop:20}}>Match Configuration</Text>
        <View style={{flexDirection:'row',marginHorizontal:5,marginTop:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginVertical:10,marginRight:4}} >Match Type</Text>
            <View style={{width:'60%'}}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            </View>
            
        </View>

        <View style={{flexDirection:'row',marginHorizontal:5,marginTop:40}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginVertical:10,marginRight:69}} >City</Text>
            <View style={{width:'60%'}}>
                <TextInput onChangeText={(text)=>setCity(text.trim())} style={{borderWidth:1,borderRadius:10}} placeholder='City'/>
            </View>
            
        </View>

        <View style={{flexDirection:'row',marginHorizontal:5,marginTop:40}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginVertical:10,marginRight:4}} >Over/Bowler</Text>
            <View style={{width:'60%'}}>
            <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
            />
            </View>
            
        </View>

        <View style={{flexDirection:'row',marginHorizontal:5,marginVertical:40}}>
        <Text style={{fontSize:20,fontWeight:'bold',marginVertical:10,marginRight:14}} >Date/Time</Text>
            <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:'60%'}} onPress={showDatePicker}>
            <View style={{flexDirection:'row'}}>
                <Image style={{height:30,width:30,marginVertical:10,marginHorizontal:5}} source={require('../../Assets/calendar.png')} />
                <Text style={{marginVertical:14,marginHorizontal:5}}>{mdate}</Text>
                <Text style={{marginVertical:14,marginHorizontal:2}}>{`${mtime!==""?", Time :"+mtime:""}`}</Text>
            </View>    
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                 mode='datetime'
                 is24Hour={true}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
            />
        </View>

        
        

        <View style={{flexDirection:'row',marginHorizontal:5,marginTop:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginVertical:10,marginRight:45}} >Ground</Text>
            <View style={{width:'60%'}}>
            <DropDownPicker
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
            />
            </View>
            
        </View>
       <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:'#367545',marginVertical:20,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:135}} >Schedule</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CreateMatch
