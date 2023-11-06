import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View ,TouchableOpacity,Image} from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ViewMatchList from './ViewMatchList';
import { useNavigation } from '@react-navigation/native';

const RenderMatch = () => {
    const[alldata,setAlldata]=useState([])
    const navigation=useNavigation()
    const getData=()=>{
        console.log("get Data")
        const path='/user/'+auth().currentUser.uid+"/match"
    
        database()
        .ref(path)
        .once('value')
        .then(snapshot => {
            //console.log(snapshot.val())
            let tempArr=[]
            for(let x in snapshot.val()){
                tempArr.push({
                    matchid:x,
                    hisUid:snapshot.val()[x].against,
                    name:snapshot.val()[x].name,
                    city:snapshot.val()[x].city,
                    date:new Date(snapshot.val()[x].date).getDay()+"-"+(new Date(snapshot.val()[x].date).getMonth()+1)+"-"+new Date(snapshot.val()[x].date).getFullYear(),
                    time:new Date(snapshot.val()[x].date).getHours()+":"+new Date(snapshot.val()[x].date).getMinutes(),
                    ground:snapshot.val()[x].ground,
                    over:snapshot.val()[x].matchtype,
                    perbowler:snapshot.val()[x].perbowler,
                    status:(snapshot.val()[x].date > (new Date().getTime()) ? "Upcoming" : "Previous")
                })
            }
            console.log(tempArr)
            setAlldata(tempArr)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <View style={{flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")} style={{width:'100%',height:60,backgroundColor:'white'}}>
        <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../../Assets/previous.png')} />
    </TouchableOpacity>
        <Text style={{fontSize:25,fontWeight:'bold',marginTop:20}}>Match Details</Text>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {alldata.map((ele,ind)=>
                        {
                            return <ViewMatchList matchid={ele.matchid} key={ind} name={ele.name} city={ele.city} date={ele.date} time={ele.time} ground={ele.ground} over={ele.over} perbowler={ele.perbowler} status={ele.status} uid={ele.hisUid} />
                        }
                    )}
        </ScrollView>
    </View>
  )
}

export default RenderMatch