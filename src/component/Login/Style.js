import { StyleSheet } from "react-native";
import Register from '../Register/Register';

export const Style=StyleSheet.create({
    container:{flexDirection:'column',justifyContent:'center',alignItems:'center',},
    headerText:{fontSize:20,fontWeight:'bold',marginTop:200},
    ccode:{flexDirection:'row',marginVertical:10},
    opac:{paddingHorizontal:10},
    codecontainer:{flexDirection:'row',borderWidth:1,borderColor:'grey',borderRadius:10},
    codeText:{
        color: 'black',
        fontSize: 20,
        marginVertical:10,
        marginHorizontal:2
    },
    downImg:{height:17,width:17,marginVertical:16,marginRight:2},
    phoneText:{borderWidth:1,borderRadius:10,width:'75%',borderColor:'grey'},
    countryPicker:{backgroundColor:'red',height:'auto'},
    RegisterBtn:{backgroundColor:'#367545',marginVertical:10,borderRadius:10},
    RegisterText:{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:108},
    bOX:{flexDirection:'column',justifyContent:'center',alignItems:'center'},
    subbox:{flexDirection:'row',marginVertical:9,marginHorizontal:12},
    inp:{textAlign:'center',borderWidth:1,borderRadius:10,marginLeft:5},
    confirmContainer:{backgroundColor:'#367545',marginVertical:10,borderRadius:10},
    confirmText:{color:'white',fontSize:20,fontWeight:'bold',paddingVertical:10,paddingHorizontal:108}
})