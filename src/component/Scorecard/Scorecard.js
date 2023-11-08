import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Text,View } from 'react-native'

const Scorecard = () => {
    const {alldata}=useRoute().params
    console.log(alldata)
  return (
    <View>
        <Text>
            hello
        </Text>
    </View>
  )
}

export default Scorecard