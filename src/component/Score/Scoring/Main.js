import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View,Image, TouchableOpacity,ScrollView, Alert, Modal, TextInput } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';


var prev=0;
const Main = () => {
  const[matchResult,setMatchDetails]=useState("")
  const[viewScore,setViewScrore]=useState(false)
  const[summaryBatting,setSummaryBatting]=useState([])
  const[summaryBowling,setSummaryBowling]=useState([])
  const[allSummaryData,setAllSummaryData]=useState([])
  const[ind,setInd]=useState(2)
  const[bind,setBind]=useState(9)
  const navigation=useNavigation()
  const [modText,setModText]=useState(0)
  const{name,city,date,time,ground,over,perbowler,status,uid,matchid,myTeam,oppTeam,batting}=useRoute().params
  const postData=(data,path)=>{
        database()
        .ref(path)
        .update(data)
        .then(()=>{
          console.log("Inserted successfully")
        })
        .catch((err)=>{
          console.log(err)
        })
  }
 //myname
  const[myname,setMyname]=useState("")
  const[batFirst,setBatFirst]=useState(0);
  const getMyname=(batFirst)=>{
    const path="/user/"+auth().currentUser.uid
    database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      setMyname(snapshot.val().name)
      if(inningCount==0){
        batFirst===0? setTeamName(`${snapshot.val().name.split(' ')[0]}'s team`):setTeamName(`${name.split(' ')[0]}'s team`)
      }else{
        batFirst===0? setTeamName(`${name.split(' ')[0]}'s team`):setTeamName(`${snapshot.val().name.split(' ')[0]}'s team`)
      }
      
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const getBatfirst=()=>{
    const p1="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score"
        database()
        .ref(p1)
        .once('value')
        .then(snapshot => {
          setBatFirst(snapshot.val().batfirst)
          //console.log(snapshot.val().batfirst)
   
          getMyname(snapshot.val().batfirst)
        })
        .catch((err)=>{
            console.log(err)
        })
  }
  useEffect(()=>{
      getMyname(0)
      getBatfirst()
      
  },[])

  // initial db setup

  const initialSetUp=()=>{
   
          
    if(batFirst===0){
      //inning 1
          //my team batter insertion
          for(let i=0;i<myTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning1/batting/"+myTeam[i]
            const data={
              six:0,
              four:0,
              ballcount:0,
              totalrun:0,
              active:(i==0 || i==1)?"yes":"no",
              out:"no",
              striker:i==0?"yes":"no",
              nostriker:i==1?"yes":"no" 
            }
            postData(data,path)
          }
          //his team bowler insertion
          for(let i=0;i<oppTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning1/bowler/"+oppTeam[i]
            const data={
              totalover:0,
              curbowl:0,
              wickettaken:0,
              runcon:0,
              active:(i==10)?"yes":"no"
            }
            postData(data,path)
          }
      
      //inning 2
          //his team batter insertion
          for(let i=0;i<oppTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning2/batting/"+oppTeam[i]
            const data={
              six:0,
              four:0,
              ballcount:0,
              totalrun:0,
              active:(i==0 || i==1)?"yes":"no",
              out:"no",
              striker:i==0?"yes":"no",
              nostriker:i==1?"yes":"no" 
            }
            postData(data,path)
          }
          
          //my team bowler insertion
          for(let i=0;i<myTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning2/bowler/"+myTeam[i]
            const data={
              totalover:0,
              curbowl:0,
              wickettaken:0,
              runcon:0,
              active:(i==10)?"yes":"no"
            }
            postData(data,path)
          }

    }else{
      //inning1
          //his team batter insertion
          for(let i=0;i<oppTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning1/batting/"+oppTeam[i]
            const data={
              six:0,
              four:0,
              ballcount:0,
              totalrun:0,
              active:(i==0 || i==1)?"yes":"no",
              out:"no",
              striker:i==0?"yes":"no",
              nostriker:i==1?"yes":"no" 
            }
            postData(data,path)
          }
          
          //my team bowler insertion
          for(let i=0;i<myTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning1/bowler/"+myTeam[i]
            const data={
              totalover:0,
              curbowl:0,
              wickettaken:0,
              runcon:0,
              active:(i==10)?"yes":"no"
            }
            postData(data,path)
          }

      //inning2

          //my team batter insertion
          for(let i=0;i<myTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning2/batting/"+myTeam[i]
            const data={
              six:0,
              four:0,
              ballcount:0,
              totalrun:0,
              active:(i==0 || i==1)?"yes":"no",
              out:"no",
              striker:i==0?"yes":"no",
              nostriker:i==1?"yes":"no" 
            }
            postData(data,path)
          }

          //his team bowler insertion
          for(let i=0;i<oppTeam.length;i++){
            const path="/user/"+auth().currentUser.uid+"/match/"+matchid+"/score/inning2/bowler/"+oppTeam[i]
            const data={
              totalover:0,
              curbowl:0,
              wickettaken:0,
              runcon:0,
              active:(i==10)?"yes":"no"
            }
            postData(data,path)
          }
    }
  }
  useEffect(()=>{
    initialSetUp()
  },[])
  const[inningCount,setInningCount]=useState(0)
  const[bowling,setBowling]=useState([])
  const [total,setTotalScore]=useState(0)
  const [striker,setStriker]=useState(0)

  const [firstScorer,setFirstScorer]=useState(0);
  const [secondScorer,setSecondScorer]=useState(0);

  const [firstScorerBall,setFirstScorerBall]=useState(0);
  const [secondScorerBall,setSecondScorerBall]=useState(0)
  const [teamName,setTeamName]=useState("")

  
  const[inning1Score,setInning1Score]=useState(0)
  const[loading,setLoading]=useState(false)
  const getDatafromAsync=async(inning)=>{
    let data=0
    try {
      const value = await AsyncStorage.getItem(inning);
      if (value !== null) {
        // We have data!!
        for(let x in JSON.parse(value)){
          if(x==="total"){
            //console.log(JSON.parse(value)[x])
            data=JSON.parse(value)[x]
            if(inningCount==1){
              setLoading(false)
              setInning1Score(data)
              setLoading(true)
            }
            //console.log(data)
    
          }
          
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
      
    }
    // console.log(data)
    // return data;
  }

  const [strikerOne,setStrikerOne]=useState(batFirst===0?myTeam[0].split('(')[0]:oppTeam[0].split('(')[0]);
  const [strikerTwo,setStrikerTwo]=useState(batFirst===0?myTeam[1].split('(')[0]:oppTeam[1].split('(')[0])
  const[extraBall,setExtraBall]=useState(0)
  const score=async(val,ballCount,tag)=>{
    setBowling([...bowling,{val:val,tag:tag}])
    if(ballCount===0) setExtraBall(extraBall+1)
    if((bowling.length+1-extraBall)%6===0){
      
      if(val%2===0){
        if(striker===0){
          if(ballCount!==0){
            setFirstScorer(firstScorer+val)
            setFirstScorerBall(firstScorerBall+1)
            setStriker(1)
          }
         
        }else{
          if(val===0 && ballCount===0){
  
          }
          else if(ballCount!==0){
            setSecondScorer(secondScorer+val)
            setSecondScorerBall(secondScorerBall+1)
            setStriker(0)
          }
        }
      }else{
        if(striker===1){
          if(ballCount!==0){
            setSecondScorer(secondScorer+val)
          setSecondScorerBall(secondScorerBall+1)
          setStriker(1)
          }
        }else{
          if(ballCount!==0){
            setFirstScorer(firstScorer+val)
          setFirstScorerBall(firstScorerBall+1)
          setStriker(0)
          }
        }
      }
      //end
    }
    else if(val%2===0){
      if(striker===0){
        if(ballCount!==0){
          setFirstScorer(firstScorer+val)
          setFirstScorerBall(firstScorerBall+1)
          setStriker(0)
        }
       
      }else{
        if(val===0 && ballCount===0){

        }
        else if(ballCount!==0){
          setSecondScorer(secondScorer+val)
          setSecondScorerBall(secondScorerBall+1)
          setStriker(1)
        }
      }
    }else{
      if(striker===1){
        if(ballCount!==0){
          setSecondScorer(secondScorer+val)
        setSecondScorerBall(secondScorerBall+1)
        setStriker(0)
        }
      }else{
        if(ballCount!==0){
          setFirstScorer(firstScorer+val)
        setFirstScorerBall(firstScorerBall+1)
        setStriker(1)
        }
      }
    }
  
    setTotalScore(total+val)

    if(inningCount===1){
     getDatafromAsync("inning1").then(()=>{
      
        if(loading){
        console.log(inning1Score)
  
        if((total+val)>inning1Score ){
          const bowlingData1={
            name:bowlerName,
            overs:1,
            wicketcount:wicketCount,
            run:total-prev
          }
          setSummaryBowling([...summaryBowling,bowlingData1]) 
          prev=total
          //console.log([...summaryBowling,bowlingData1])
          setWicketCount(0)

          const battingData={
            name:strikerOne,
            outby:"Not Out",
            run: firstScorer,
            bowlcount:firstScorerBall
          }
          const battingData1={
            name:strikerTwo,
            outby:"Not Out",
            run: secondScorer,
            bowlcount:secondScorerBall
          }
          setSummaryBatting([...summaryBatting,battingData,battingData1])
          console.log([...summaryBatting,battingData,battingData1])
          setAllSummaryData([...allSummaryData,{team:inningCount,batting:[...summaryBatting,battingData,battingData1],bowling:[...summaryBowling,bowlingData1]}])
          setSummaryBowling([])
          setSummaryBatting([])
          console.log([...allSummaryData,{team:inningCount,batting:summaryBatting,bowling:summaryBowling}])
      
          if(batFirst===0){
            Alert.alert(name)
            setMatchDetails(name+" won")
            setViewScrore(true)
            setTotalScore(0)
            prev=0
            //navigation.navigate("Dashboard",{alldata:allSummaryData})
          }else{
            Alert.alert(myname)
            setMatchDetails(myname+" won")
            setViewScrore(true)
            setTotalScore(0)
            prev=0
            //navigation.navigate("Dashboard",{alldata:allSummaryData})
          }
          
        }else if(bowling.length-extraBall===23){
          
          const bowlingData1={
            name:bowlerName,
            overs:1,
            wicketcount:wicketCount,
            run:total-prev
          }
          //setSummaryBowling([...summaryBowling,bowlingData1]) 
          prev=0
         // console.log([...summaryBowling,bowlingData1])
          setWicketCount(0)

          const battingData={
            name:strikerOne,
            outby:"Not Out",
            run: firstScorer,
            bowlcount:firstScorerBall
          }
          const battingData1={
            name:strikerTwo,
            outby:"Not Out",
            run: secondScorer,
            bowlcount:secondScorerBall
          }
          setSummaryBatting([...summaryBatting,battingData,battingData1])
          console.log([...summaryBatting,battingData,battingData1])
          setAllSummaryData([...allSummaryData,{team:inningCount,batting:[...summaryBatting,battingData,battingData1],bowling:[...summaryBowling,bowlingData1]}])
          setSummaryBowling([])
          setSummaryBatting([])
          console.log([...allSummaryData,{team:inningCount,batting:summaryBatting,bowling:summaryBowling}])
        
           if(inning1Score>(total+val)){
            if(batFirst===0){
              Alert.alert(myname)
              setMatchDetails(myname+" won")
              setViewScrore(true)
              setTotalScore(0)
            prev=0
              //navigation.navigate("Dashboard",{alldata:allSummaryData})
            }else{
              Alert.alert(name)
              setMatchDetails(name+" won")
              setViewScrore(true)
              setTotalScore(0)
            prev=0
              //navigation.navigate("Dashboard",{alldata:allSummaryData})
            }
          }else{
            const bowlingData1={
              name:bowlerName,
              overs:1,
              wicketcount:wicketCount,
              run:total-prev
            }
            setSummaryBowling([...summaryBowling,bowlingData1]) 
            prev=total
            //console.log([...summaryBowling,bowlingData1])
            setWicketCount(0)
  
            const battingData={
              name:strikerOne,
              outby:"Not Out",
              run: firstScorer,
              bowlcount:firstScorerBall
            }
            const battingData1={
              name:strikerTwo,
              outby:"Not Out",
              run: secondScorer,
              bowlcount:secondScorerBall
            }
            setSummaryBatting([...summaryBatting,battingData,battingData1])
            console.log([...summaryBatting,battingData,battingData1])
            setAllSummaryData([...allSummaryData,{team:inningCount,batting:summaryBatting,bowling:summaryBowling}])
            setSummaryBowling([])
            setSummaryBatting([])
            console.log([...allSummaryData,{team:inningCount,batting:summaryBatting,bowling:summaryBowling}])
    
            Alert.alert("Draw")
            setMatchDetails("Draw")
            setViewScrore(true)
            setTotalScore(0)
            prev=0
            //navigation.navigate("Dashboard",{alldata:allSummaryData})
          }
        }
      }
      
     })
    
      
    }
    
  }

  const[wideActive,setWideActive]=useState(false)
  const handleWide=()=>{
    setWideActive(true)
    setModal(true)
  }
 const[byeActive,setByeActive]=useState(false)
  const handleBye=()=>{
    setByeActive(true)
    setModal(true)
  }
  const [noBallCount,setNoBallCount]=useState(0)
  const[modal,setModal]=useState(false)
  const [noBallActive,setNoBallActive]=useState(false)
  const handleNoBall=()=>{
    
    if(noBallCount+1>2){
      const noball="Dead ball"
      Alert.alert(noball)
    }else{
      setNoBallActive(true)
      setModal(true)
      
    }
    setNoBallCount(noBallCount+1)
  }
  
  const handleModal=()=>{
    console.log(modText)

    
    if(modText<=6){
      if(byeActive){
        score((parseInt(modText)),1,"bye")
        setByeActive(false)
      }else if(noBallActive){
        score((1+parseInt(modText)),0,"no")
      }
      else if(wideActive){
        score((parseInt(modText)),0,"wide")
        setWideActive(false)
      }
      else{
        score((1+parseInt(modText)),0,"")
      }
      
      setModal(false);
    }else{
      Alert.alert("Enter number less than equal to 6")
    }
    
  }
  useEffect(()=>{
    inning()
  },[bowling])

  const [bowlerName,setBowlerName]=useState(batFirst===0?oppTeam[10].split('(')[0]:myTeam[10].split('(')[0])
  
  const inning=()=>{
    let bowlingData={}
    let bowlingData1={}
 
    if(bowling.length>0 && (bowling.length-extraBall)%6===0){
      
      bowlingData={
        name:bowlerName,
        overs:1,
        wicketcount:wicketCount,
        run:total-prev
      }
      
      setWicketCount(0)
      setSummaryBowling([...summaryBowling,bowlingData])
      prev=total
      //console.log([...summaryBowling,bowlingData])
      if(inningCount==0){
        setBowlerName(batFirst===0?oppTeam[bind]:myTeam[bind])
        setBind(bind-1)
      }else{
        setBowlerName(batFirst===0?myTeam[bind]:oppTeam[bind])
        setBind(bind-1)
      }
    }
  
    if(bowling.length-extraBall===24){

      bowlingData1={
        name:bowlerName,
        overs:1,
        wicketcount:wicketCount,
        run:total-prev
      }
      //setSummaryBowling([...summaryBowling,bowlingData1]) 
      prev=0
      //console.log([...summaryBowling,bowlingData1])
      setWicketCount(0)
      const battingData={
        name:strikerOne,
        outby:"Not Out",
        run: firstScorer,
        bowlcount:firstScorerBall
      }
      const battingData1={
        name:strikerTwo,
        outby:"Not Out",
        run: secondScorer,
        bowlcount:secondScorerBall
      }
      setSummaryBatting([...summaryBatting,battingData,battingData1])
   
       console.log([...summaryBatting,battingData,battingData1])
       console.log([...allSummaryData,{team:inningCount,batting:summaryBatting,bowling:summaryBowling}])
      
      setAllSummaryData([...allSummaryData,{team:inningCount,batting:[...summaryBatting,battingData,battingData1],bowling:[...summaryBowling,bowlingData1]}])
      

      setSummaryBatting([])
      setSummaryBowling([])
      const data = {
        name: teamName,
        total:total,
        batsman1:batFirst===0?myTeam[0]:oppTeam[0],
        batsman2:batFirst===0?myTeam[1]:oppTeam[1],
        batsman1Score:firstScorer,
        batsman2Score:secondScorer,
        oppBowler:batFirst===0?oppTeam[10].split('(')[0]:myTeam[10].split('(')[0]
        
      };
      try{
        if(inningCount==0){
          AsyncStorage.setItem('inning1', JSON.stringify(data));
        }else{
          AsyncStorage.setItem('inning2', JSON.stringify(data));

        }
        

        //update details
         
          setTotalScore(0)
          setBowling([])
          setStriker(0)
          setFirstScorer(0)
          setSecondScorer(0)
          setFirstScorerBall(0)
          setSecondScorerBall(0)
          setExtraBall(0)
          setNoBallCount(0)
          setStrikerOne(batFirst===0?oppTeam[0].split('(')[0]:myTeam[0].split('(')[0])
          setStrikerTwo(batFirst===0?oppTeam[1].split('(')[0]:myTeam[1].split('(')[0])
        if(batFirst===0){
          setTeamName(`${name.split(' ')[0]}'s team`)
        }else{
          setTeamName(`${myname.split(' ')[0]}'s team`)
        }
        //update details
        console.log("Insertion success")
      }catch{
        Alert.alert("Insertion error")
      }
      setBowlerName(batFirst===0?myTeam[10].split('(')[0]:oppTeam[10].split('(')[0])
      setTotalScore(0)
      prev=0
      setInningCount(1)
      setInd(2)
      setBind(9)
      
      Alert.alert("Change in the innings")
    }
   
    if(bowling.length>6){
      inning1();
    }else{
      inning2()
    }
  }

  useEffect(()=>{
    if(striker===0){
      setFirstScorer(0)
      setFirstScorerBall(0)
      
    }else{

      setSecondScorer(0)
      setSecondScorerBall(0)

    }
  },[strikerOne,strikerTwo])

  const[wicketCount,setWicketCount]=useState(0)
  const handleOut=()=>{
    console.log("Striker",striker)
    setWicketCount(wicketCount+1)
    const battingData={
      name:striker===0?strikerOne:strikerTwo,
      outby:bowlerName,
      run: striker===0?firstScorer:secondScorer,
      bowlcount: striker===0?firstScorerBall:secondScorerBall
    }

    setSummaryBatting([...summaryBatting,battingData])
    console.log([...summaryBatting,battingData])
     
    
    if(ind===11){
      
      const data = {
        name: teamName,
        total:total,
        batsman1:batFirst===0?myTeam[0]:oppTeam[0],
        batsman2:batFirst===0?myTeam[1]:oppTeam[1],
        batsman1Score:firstScorer,
        batsman2Score:secondScorer,
        oppBowler:batFirst===0?oppTeam[10].split('(')[0]:myTeam[10].split('(')[0]
        
      };
      try{
        if(inningCount==0){
          AsyncStorage.setItem('inning1', JSON.stringify(data));
        }else{
          AsyncStorage.setItem('inning2', JSON.stringify(data));

        }
        

        //update details
        setStrikerOne(batFirst===0?myTeam[0].split('(')[0]:oppTeam[0].split('(')[0])
        setStrikerTwo(batFirst===0?myTeam[1].split('(')[0]:oppTeam[1].split('(')[0])
    
          setTotalScore(0)
          setBowling([])
          setStriker(0)
          setFirstScorer(0)
          setSecondScorer(0)
          setFirstScorerBall(0)
          setSecondScorerBall(0)
          setExtraBall(0)
          setNoBallCount(0)
          setBind(9)
          setInd(2)
        if(batFirst===0){
          setTeamName(`${name.split(' ')[0]}'s team`)
        }else{
          setTeamName(`${myname.split(' ')[0]}'s team`)
        }
        //update details
        console.log("Insertion success")
      }catch{
        Alert.alert("Insertion error")
      }
      setTotalScore(0)
      prev=0
      setInningCount(1)
      if(inningCount==0){
        setBowlerName(batFirst===0?oppTeam[bind]:myTeam[bind])
        setBind(bind-1)
      }else{
        setBowlerName(batFirst===0?myTeam[bind]:oppTeam[bind])
        setBind(bind-1)
      }
      
      Alert.alert("Change in the innings")
      
    }
    else if(striker===0){
      setStrikerOne(batFirst===0?myTeam[ind].split('(')[0]:oppTeam[ind].split('(')[0])
      setFirstScorer(0)
      setFirstScorerBall(0)
      setInd(ind+1)
      score(0,1,"out")
    }else{
      setStrikerTwo(batFirst===0?myTeam[ind].split('(')[0]:oppTeam[ind].split('(')[0])
      setSecondScorer(0)
      setSecondScorerBall(0)
      setInd(ind+1)
      score(0,1,"out")
    }

    
  }
  const inning1=()=>{

  }
  const inning2=()=>{

  }

  return (
    <View >
   {viewScore && <Modal visible={viewScore}>
     {allSummaryData.length===2 && <ScrollView>
      <View style={{marginLeft:5,marginBottom:5}}>
        <Text style ={{fontSize:25,fontWeight:'bold'}}>{batFirst===0?myname:name}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontWeight:'bold'}}>Batting</Text>
        <Text style={{marginLeft:26}}> Balls</Text>
        <Text style={{marginLeft:26}}> Run</Text>
        </View>
        
                {allSummaryData[0].batting.map((ele,ind)=>{
                  return  <View key={ind} style={{flexDirection:'row',marginVertical:5,borderWidth:1,borderColor:'lightgrey',marginRight:4}}>
                            <View style={{}}>
                              <Text style={{fontSize:15,fontWeight:'bold'}}>{ele.name}</Text>
                              <Text >{ele.outby}</Text>
                            </View>
                              <Text style={{marginLeft:29}}>{ele.bowlcount}</Text>
                              <Text style={{marginLeft:39}}>{ele.run}</Text>
                          </View>
                })}
        
                
      </View>

      
      <View style={{marginLeft:5,marginBottom:5}}>
        <Text style ={{fontSize:25,fontWeight:'bold'}}>{batFirst===0?name:myname}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontWeight:'bold'}}>Batting</Text>
        <Text style={{marginLeft:26}}> Balls</Text>
        <Text style={{marginLeft:26}}> Run</Text>
        </View>
            {allSummaryData[1].batting.map((ele,ind)=>{
              return  <View key={ind} style={{flexDirection:'row',marginVertical:5,borderWidth:1,borderColor:'lightgrey',marginRight:4}}>
                        <View style={{}}>
                          <Text style={{fontSize:15,fontWeight:'bold'}}>{ele.name}</Text>
                          <Text >{ele.outby}</Text>
                        </View>
                          <Text style={{marginLeft:29}}>{ele.bowlcount}</Text>
                          <Text style={{marginLeft:39}}>{ele.run}</Text>
                      </View>
            })}
      </View>  
               <Text style={{marginVertical:15,fontSize:25,fontWeight:"bold",textAlign:"center"}}>{matchResult}</Text> 
               <TouchableOpacity 
               onPress={()=>{
                setViewScrore(false)
                navigation.navigate("Dashboard")
               }}  
               style={{
                backgroundColor:'#367545',
                marginVertical:10,
                borderRadius:10,
                marginHorizontal:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,textAlign:'center'}} >Close</Text>
        </TouchableOpacity>
      </ScrollView>}
    </Modal>}

    <Modal visible={modal}>
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:100}}>
       <TextInput  keyboardType="numeric" onChangeText={(text)=>setModText(text.trim())} style={{borderWidth:1,width:"70%"}} placeholder='Enter Run' />
       <TouchableOpacity onPress={handleModal} style={{backgroundColor:'#367545',marginVertical:10,borderRadius:10}} >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:108}} >Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    <Image style={{width:'100%',height:"80%",objectFit:"fill",position:'absolute'}} source={require('../../../Assets/st.jpg')}  />
    
    <View style={{width:'100%',height:"80%",backgroundColor:"black",opacity:0.7,position:'relative'}} />
    <View style={{position:"absolute"}}>
         <View style={{flexDirection:'row'}}>
            <TouchableOpacity >
                <Image style={{height:20,width:20,marginVertical:10,marginHorizontal:5}} source={require('../../../Assets/left.png')} />
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:15,fontWeight:'700',marginVertical:8}} >{teamName}</Text>
         </View>
         <View style={{flexDirection:"column",justifyContent:'center',alignItems:'center',marginHorizontal:78,marginTop:160}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'white',fontSize:25,fontWeight:'500'}}>{total}/{ind-2}</Text>
              <Text style={{color:'white',fontSize:15,fontWeight:'300',marginVertical:6,marginHorizontal:3}}>({parseInt((bowling.length-extraBall)/6)}.{(bowling.length-extraBall)%6?(bowling.length-extraBall)%6:0}/4)</Text>
            </View>
            <Text style={{color:'white',fontSize:10}}>{batFirst===0?myname.split("'")[0]+" won the toss and elected to bat":name.split("'")[0]+" won the toss and elected to bat"}</Text>
         </View>
         <View style={{flexDirection:'row',marginTop:140}}>
            <View style={{borderWidth:0.5,borderColor:'lightgrey',width:"50%"}}>
              <Text style={{color:striker==0?"green":'white',fontSize:15,fontWeight:'bold',marginVertical:8,marginHorizontal:6}} >{strikerOne} {firstScorer}({firstScorerBall})</Text>
            </View>
            <View style={{borderWidth:0.5,borderColor:'lightgrey',width:"50%"}}>
              <Text style={{color:striker==1?"green":'white',fontSize:15,fontWeight:'bold',marginVertical:8,marginHorizontal:6}} >{strikerTwo} {secondScorer}({secondScorerBall})</Text>
            </View>
         </View>
         <View style={{backgroundColor:'#343d40'}}>
          <View style={{flexDirection:'row',marginTop:7,marginBottom:7}}>
            <Image style={{height:20,width:20,marginLeft:5}} source={require('../../../Assets/ball.png')} />
            <Text style={{color:'white',marginLeft:5}} >{bowlerName}</Text>
            <Image style={{height:20,width:20,marginLeft:5}} source={require('../../../Assets/wicket.png')} />
            <Text style={{color:'white',marginLeft:"82%",position:'absolute'}} >{bowling.length-extraBall}</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{marginHorizontal:6,marginBottom:15}} horizontal={true}>
            {bowling.map((ele,ind)=>{
              return  <View key={ind} style={{backgroundColor:'white',borderRadius:20,marginHorizontal:4}}>
              {ele.tag==="" && <Text style={{fontWeight:'bold',textAlign:'center',marginHorizontal:10,marginVertical:5}}>{ele.val}</Text>}
              {ele.tag==="no" && <Text style={{fontWeight:'bold',textAlign:'center',marginHorizontal:10,marginVertical:5}}>N{ele.val}</Text>}
              {ele.tag==="bye" && <Text style={{fontWeight:'bold',textAlign:'center',marginHorizontal:10,marginVertical:5}}>B{ele.val}</Text>}
              {ele.tag==="out" && <Text style={{fontWeight:'bold',textAlign:'center',marginHorizontal:10,marginVertical:5}}>W</Text>}
              {ele.tag==="wide" && <Text style={{fontWeight:'bold',textAlign:'center',marginHorizontal:10,marginVertical:5}}>WD{ele.val}</Text>}
            </View>
            })}
          </ScrollView>
         </View>
         <View style={{height:'100%',width:'100%',backgroundColor:'white'}}>
           <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>score(0,1,"")} style={{borderWidth:0.3,height:90,width:131}}>
                <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>score(1,1,"")} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>score(2,1,"")} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>2</Text>
              </TouchableOpacity>
              
           </View>

           <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>score(3,1,"")} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>score(4,1,"")} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>score(6,1,"")} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>6</Text>
              </TouchableOpacity>
              
           </View>
           <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={handleWide} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>WD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNoBall} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>NB</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBye} style={{borderWidth:0.3,height:90,width:131}}>
              <Text style={{textAlign:'center',marginVertical:"25%",fontSize:15}}>BYE</Text>
              </TouchableOpacity>
              
           </View>
           <TouchableOpacity onPress={handleOut} style={{backgroundColor:'#ad3a23',height:'100%'}}>
            <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',color:'white',marginVertical:10}}>OUT</Text>
           </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

export default Main