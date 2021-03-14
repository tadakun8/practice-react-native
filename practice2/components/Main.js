import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Button, FlatList, Dimensions, Animated, Text, ActivityIndicator, ActivityIndicatorComponent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spining from './Spining'


export default function Main() {
  
  // Dimensionsの使い方
  // 画面幅を取得したい場合に使用
  const { width, height, scale } = Dimensions.get('window')

  // ネットワーク通信
  const [threads, setThreads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch('https://www.reddit.com/r/newsokur/hot.json')
      .then(response => response.json())
      .then(response => {
        let threads = response.data.children
        threads = response.data.children.map(item => {
          item.key = item.data.url
          return item
        })
        setThreads(threads)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  /**
   * Animatedの使い方
   */
  // const [opacity, setOpacity] = useState(new Animated.Value(0))
  const opacity = useRef(new Animated.Value(0)).current
  const fontSize = useRef(new Animated.Value(0)).current

  // [TODO] interpolate
  const _fontSize = fontSize.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12]
  })
  // [TODO] pararellでも順番を制御できる
  // [TODO] friction
  const animate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false
    }).start(({ finished }) => {
      Animated.spring(fontSize, {
        toValue: 1,
        friction: 1
      }).start()
    })
  }
  if(!isLoading) animate();

  /** 
   * Async Storageの使い方
  */
  const save = ({data}) => {
    AsyncStorage.setItem(data.title, JSON.stringify(data), (err) => {
      if(err){
        console.error(err)
        return false
      }else {
        console.log(data.title)
        console.log("stock")
        return true
      }
    })
  }
  // return (
  //   <View style={styles.container}>
  //     { isLoading ? <ActivityIndicator /> : <Text>おはよう</Text> }
  //   </View>
  // )
  return (
    <View style={styles.container}>
      {isLoading 
        ? 
          <Spining />
        :
          <Animated.View style={{
            opacity: opacity
          }}>
            <FlatList
              data={threads}
              renderItem={({item}) => {
                return (
                  <View key={item.key} style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%'
                  }}>
                    <Image source={{uri:item.data.thumbnail}} style={{
                      width: 50,
                      height: 50
                    }}/>
                    <View style={{
                      width: width - 50
                    }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column'
                      }}>
                        <Animated.Text style={{
                          fontSize: _fontSize
                        }}>
                          {item.data.title}
                        </Animated.Text>
                        <Button 
                          onPress={() => save(item)}
                          title='ストック'
                        />
                      </View>
                    </View>
                  </View>
                )
              }}
            />
          </Animated.View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
