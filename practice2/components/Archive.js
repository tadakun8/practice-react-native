import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

// AsyncStorageは@react-native-async-storage/async-storageのモジュールを使用
// react-nativeはdeprecated
export default function Archive() {
  const navigationOptions = ({navigation}) => ({
    title: 'ストックした記事',
    headerTintColor: 'white',
    headerBackTitleStyle: { color: 'white' },
    headerStyle:{ backgroundColor : "#00aced" },
  })

  const [threads, setThreads] = useState([])

  const getData = () => {
    AsyncStorage.getAllKeys((err) => {
      if(err) {
        console.log(err)
        return false
      } else {
        AsyncStorage.multiGet(keys, (err, data) => {
          let threads = data.map((item) => {
            return JSON.parse(item[1])
          })
          setThreads(threads)
          return true
        })
      }
    })
  }
  const getDataa = async () => {
    try{
      const keys = await AsyncStorage.getAllKeys()
      // console.error(keys)
      const result = await AsyncStorage.multiGet(keys)
      const favorite = result.map(item => { 
        const jsoned = JSON.parse(item[1])
        return jsoned
      })
      setThreads(favorite)
      return true
    } catch (error){
      console.error(error)
      return false
    }
  }
  useEffect(async () => {
    await getDataa()
  }, [])
  const { width } = Dimensions.get('window')

  return (
    <View style ={{
      flex: 1,
      flexDirection: 'row',
      width: '100%'
    }}>
      <FlatList 
        data={threads}
        renderItem={({item}) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              borderBottomWidth: 2,
              borderColor: '#f5f5f5'
            }}>
              <Image 
                style={{
                  width: 50,
                  height: 50
                }}
                source={{uri: item.thumbnail}}
              />
              <View style={{
                width: width - 50
              }}>
                <View style={{
                  flex: 1, flexDirection: 'column'
                }}>
                  <Text style={{color:'#000'}}>
                    {item.title}
                  </Text>
                  <Text style={{color:'#ababab',fontSize:10}}>
                    {item.domain}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}
